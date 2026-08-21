import { describe, expect, it, vi } from 'vitest';

import { SameOriginContactGateway } from './SameOriginContactGateway';

const message = {
  name: 'Miguel',
  email: 'miguel@example.com',
  message: 'A detailed product engineering opportunity.',
};

describe('SameOriginContactGateway', () => {
  it('posts only to the same-origin server endpoint', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
    const gateway = new SameOriginContactGateway({ fetcher });

    await expect(
      gateway.send(message, undefined, { honeypot: '', elapsedMs: 2500 })
    ).resolves.toMatchObject({ success: true, code: 'accepted' });
    expect(fetcher).toHaveBeenCalledWith(
      '/api/contact/',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: expect.objectContaining({ 'X-Requested-With': 'MigudevContactForm' }),
        body: JSON.stringify({ ...message, company: '', elapsedMs: 2500 }),
      })
    );
  });

  it('maps rate limiting to actionable feedback', async () => {
    const gateway = new SameOriginContactGateway({
      fetcher: vi.fn().mockResolvedValue(new Response(null, { status: 429 })),
    });

    await expect(gateway.send(message)).resolves.toEqual({
      success: false,
      code: 'rate_limited',
      message: 'Please wait a few minutes before sending another message.',
    });
  });

  it('does not expose upstream failures', async () => {
    const gateway = new SameOriginContactGateway({
      fetcher: vi.fn().mockRejectedValue(new Error('private infrastructure detail')),
    });

    await expect(gateway.send(message)).resolves.toEqual({
      success: false,
      code: 'unavailable',
      message: 'I could not send the message. Please try again or contact me by email.',
    });
  });
});
