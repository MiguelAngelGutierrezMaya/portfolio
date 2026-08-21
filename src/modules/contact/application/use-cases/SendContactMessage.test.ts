import { describe, expect, it, vi } from 'vitest';

import type { ContactGateway } from '@contact/application/ports/ContactGateway';

import { SendContactMessage } from './SendContactMessage';

describe('SendContactMessage', () => {
  it('normalizes user input before sending', async () => {
    const gateway: ContactGateway = {
      send: vi.fn().mockResolvedValue({ success: true, message: 'ok' }),
    };

    await SendContactMessage.execute(gateway, {
      name: '  Miguel  ',
      email: '  MIGUEL@EXAMPLE.COM ',
      message: '  A detailed project message.  ',
    });

    expect(gateway.send).toHaveBeenCalledWith(
      {
        name: 'Miguel',
        email: 'miguel@example.com',
        message: 'A detailed project message.',
      },
      undefined,
      undefined
    );
  });
});
