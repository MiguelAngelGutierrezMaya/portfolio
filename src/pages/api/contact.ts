import type { APIRoute } from 'astro';
import { z } from 'zod';

import type { ContactGateway } from '@contact/application/ports/ContactGateway';
import { SendContactMessage } from '@contact/application/use-cases/SendContactMessage';
import type { ContactResult } from '@contact/domain/models/ContactMessage';
import { validateContactMessage } from '@contact/domain/services/validateContactMessage';
import { createLambdaContactGateway } from '@contact/infrastructure/gateways/LambdaContactGateway';

export const prerender = false;

const maxBodyBytes = 8 * 1024;
const contactRequestSchema = z.strictObject({
  name: z.string().min(1).max(80),
  email: z.string().min(1).max(254),
  message: z.string().min(1).max(4000),
  company: z.string().max(200),
  elapsedMs: z
    .number()
    .int()
    .nonnegative()
    .max(24 * 60 * 60 * 1000),
});

const responseHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
} as const;

const jsonResponse = (status: number, result: ContactResult): Response =>
  new Response(JSON.stringify({ success: result.success, message: result.message }), {
    status,
    headers: responseHeaders,
  });

const acceptedResponse = (): Response =>
  jsonResponse(202, {
    success: true,
    code: 'accepted',
    message: 'Message received. I will get back to you as soon as possible.',
  });

const readSourceIp = (request: Request): string => {
  const viewerAddress = request.headers.get('cloudfront-viewer-address')?.trim();
  if (viewerAddress?.startsWith('[')) return viewerAddress.slice(1, viewerAddress.indexOf(']'));
  if (viewerAddress) return viewerAddress.replace(/:\d+$/, '');

  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',').at(-1)?.trim() || 'unavailable';
};

const readOrigin = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
};

const isTrustedBrowserRequest = (request: Request, canonicalSiteUrl?: string): boolean => {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  const requestedWith = request.headers.get('x-requested-with');
  const allowedOrigins = new Set([new URL(request.url).origin, readOrigin(canonicalSiteUrl)]);

  return (
    Boolean(origin && allowedOrigins.has(origin)) &&
    (!fetchSite || fetchSite === 'same-origin') &&
    requestedWith === 'MigudevContactForm'
  );
};

export const handleContactRequest = async (
  request: Request,
  gateway: ContactGateway,
  canonicalSiteUrl = import.meta.env.PUBLIC_SITE_URL
): Promise<Response> => {
  if (!isTrustedBrowserRequest(request, canonicalSiteUrl)) {
    return jsonResponse(403, {
      success: false,
      code: 'invalid',
      message: 'The request could not be accepted.',
    });
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonResponse(415, {
      success: false,
      code: 'invalid',
      message: 'The request could not be accepted.',
    });
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > maxBodyBytes) {
    return jsonResponse(413, {
      success: false,
      code: 'invalid',
      message: 'The request is too large.',
    });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    return jsonResponse(413, {
      success: false,
      code: 'invalid',
      message: 'The request is too large.',
    });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, {
      success: false,
      code: 'invalid',
      message: 'The request could not be accepted.',
    });
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse(400, {
      success: false,
      code: 'invalid',
      message: 'The request could not be accepted.',
    });
  }

  if (parsed.data.company) return acceptedResponse();

  const message = {
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  };
  if (Object.keys(validateContactMessage(message)).length > 0) {
    return jsonResponse(400, {
      success: false,
      code: 'invalid',
      message: 'Please review the form fields and try again.',
    });
  }

  const result = await SendContactMessage.execute(gateway, message, request.signal, {
    sourceIp: readSourceIp(request),
    elapsedMs: parsed.data.elapsedMs,
  });

  if (result.success) return acceptedResponse();
  if (result.code === 'rate_limited') return jsonResponse(429, result);
  return jsonResponse(503, result);
};

const runtimeGateway = createLambdaContactGateway();

export const POST: APIRoute = ({ request }) => handleContactRequest(request, runtimeGateway);
