import { afterEach, describe, expect, it, vi } from 'vitest';

import { HttpContactGateway } from './HttpContactGateway';

const message = {
  name: 'Miguel',
  email: 'miguel@example.com',
  message: 'A detailed product engineering opportunity.',
};

describe('HttpContactGateway', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns a configuration result without performing a request', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const gateway = new HttpContactGateway({
      endpoint: '',
      serviceId: '',
      templateId: '',
      userId: '',
    });

    await expect(gateway.send(message)).resolves.toMatchObject({ success: false });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('maps a contact message to the external service contract', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }));
    const gateway = new HttpContactGateway({
      endpoint: 'https://contact.example.com',
      serviceId: 'service',
      templateId: 'template',
      userId: 'user',
    });

    await expect(gateway.send(message)).resolves.toMatchObject({ success: true });
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://contact.example.com/email/send',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('miguel@example.com'),
      })
    );
  });

  it('maps upstream failures to a safe user-facing result', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));
    const gateway = new HttpContactGateway({
      endpoint: 'https://contact.example.com',
      serviceId: 'service',
      templateId: 'template',
      userId: 'user',
    });

    await expect(gateway.send(message)).resolves.toEqual({
      success: false,
      message: 'I could not send the message. Please try again or contact me by email.',
    });
  });
});
