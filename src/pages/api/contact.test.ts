import { describe, expect, it, vi } from 'vitest';

import type { ContactGateway } from '@contact/application/ports/ContactGateway';

import { handleContactRequest } from './contact';

const validBody = {
  name: 'Miguel',
  email: 'MIGUEL@EXAMPLE.COM',
  message: 'I would like to discuss a product engineering opportunity.',
  company: '',
  elapsedMs: 2500,
};

const createRequest = (body: unknown = validBody, headers: Record<string, string> = {}): Request =>
  new Request('https://migudev.com/api/contact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://migudev.com',
      'Sec-Fetch-Site': 'same-origin',
      'X-Forwarded-For': '203.0.113.1, 198.51.100.24',
      'X-Requested-With': 'MigudevContactForm',
      ...headers,
    },
    body: JSON.stringify(body),
  });

describe('POST /api/contact', () => {
  it('validates, normalizes and forwards through the private gateway', async () => {
    const send = vi.fn().mockResolvedValue({ success: true, code: 'accepted', message: 'ok' });
    const response = await handleContactRequest(createRequest(), { send });

    expect(response.status).toBe(202);
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(send).toHaveBeenCalledWith(
      {
        name: 'Miguel',
        email: 'miguel@example.com',
        message: validBody.message,
      },
      expect.any(AbortSignal),
      expect.objectContaining({ sourceIp: '198.51.100.24' })
    );
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: 'Message received. I will get back to you as soon as possible.',
    });
  });

  it.each([
    ['cross-origin request', { Origin: 'https://attacker.example' }],
    ['cross-site fetch', { 'Sec-Fetch-Site': 'cross-site' }],
    ['missing request marker', { 'X-Requested-With': '' }],
  ])('rejects a %s before invoking infrastructure', async (_label, headers) => {
    const gateway: ContactGateway = { send: vi.fn() };
    const response = await handleContactRequest(createRequest(validBody, headers), gateway);

    expect(response.status).toBe(403);
    expect(gateway.send).not.toHaveBeenCalled();
  });

  it('silently accepts honeypot submissions without invoking infrastructure', async () => {
    const gateway: ContactGateway = { send: vi.fn() };
    const response = await handleContactRequest(
      createRequest({ ...validBody, company: 'automated spam' }),
      gateway
    );

    expect(response.status).toBe(202);
    expect(gateway.send).not.toHaveBeenCalled();
  });

  it('rejects malformed and oversized payloads', async () => {
    const gateway: ContactGateway = { send: vi.fn() };
    const malformed = await handleContactRequest(
      createRequest({ message: 'missing fields' }),
      gateway
    );
    const oversized = await handleContactRequest(
      createRequest(validBody, { 'Content-Length': String(8 * 1024 + 1) }),
      gateway
    );

    expect(malformed.status).toBe(400);
    expect(oversized.status).toBe(413);
    expect(gateway.send).not.toHaveBeenCalled();
  });

  it('maps backend throttling without leaking infrastructure details', async () => {
    const response = await handleContactRequest(createRequest(), {
      send: vi.fn().mockResolvedValue({
        success: false,
        code: 'rate_limited',
        message: 'Please wait before sending another message.',
      }),
    });

    expect(response.status).toBe(429);
    expect(await response.text()).not.toContain('Lambda');
  });
});
