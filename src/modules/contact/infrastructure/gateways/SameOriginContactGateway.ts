import type {
  ContactGateway,
  ContactGatewayContext,
} from '@contact/application/ports/ContactGateway';
import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';

interface SameOriginContactGatewayConfig {
  readonly endpoint?: string;
  readonly fetcher?: typeof fetch;
}

const unavailableResult: ContactResult = {
  success: false,
  code: 'unavailable',
  message: 'I could not send the message. Please try again or contact me by email.',
};

export class SameOriginContactGateway implements ContactGateway {
  private readonly endpoint: string;
  private readonly fetcher: typeof fetch;

  constructor({
    endpoint = '/api/contact/',
    fetcher = globalThis.fetch,
  }: SameOriginContactGatewayConfig = {}) {
    this.endpoint = endpoint;
    this.fetcher = fetcher;
  }

  async send(
    message: ContactMessage,
    signal?: AbortSignal,
    context: ContactGatewayContext = {}
  ): Promise<ContactResult> {
    try {
      const response = await this.fetcher.call(globalThis, this.endpoint, {
        method: 'POST',
        credentials: 'same-origin',
        referrerPolicy: 'strict-origin-when-cross-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'MigudevContactForm',
        },
        body: JSON.stringify({
          ...message,
          company: context.honeypot ?? '',
          elapsedMs: context.elapsedMs ?? 0,
        }),
        signal,
      });

      if (response.status === 429) {
        return {
          success: false,
          code: 'rate_limited',
          message: 'Please wait a few minutes before sending another message.',
        };
      }

      if (!response.ok) return unavailableResult;

      return {
        success: true,
        code: 'accepted',
        message: 'Message received. I will get back to you as soon as possible.',
      };
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { success: false, code: 'unavailable', message: 'The request was cancelled.' };
      }

      return unavailableResult;
    }
  }
}

export const createSameOriginContactGateway = (): SameOriginContactGateway =>
  new SameOriginContactGateway();
