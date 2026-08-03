import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { ContactGateway } from '@contact/application/ports/ContactGateway';

import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('shows accessible field errors without contacting the gateway', async () => {
    const user = userEvent.setup();
    const gateway: ContactGateway = { send: vi.fn() };

    render(<ContactForm gateway={gateway} />);
    await user.click(screen.getByRole('button', { name: /start a conversation/i }));

    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Please enter a valid email address.'
    );
    expect(screen.getByRole('status')).toHaveTextContent(/review the highlighted fields/i);
    expect(gateway.send).not.toHaveBeenCalled();
  });

  it('submits valid normalized data through the injected gateway', async () => {
    const user = userEvent.setup();
    const send = vi.fn().mockResolvedValue({ success: true, message: 'Message received.' });

    render(<ContactForm gateway={{ send }} />);
    await user.type(screen.getByLabelText('Name'), '  Miguel  ');
    await user.type(screen.getByLabelText('Email'), 'MIGUEL@EXAMPLE.COM');
    await user.type(
      screen.getByLabelText('Project or opportunity'),
      'I would like to discuss a scalable product engineering project.'
    );
    await user.click(screen.getByRole('button', { name: /start a conversation/i }));

    expect(send).toHaveBeenCalledWith(
      {
        name: 'Miguel',
        email: 'miguel@example.com',
        message: 'I would like to discuss a scalable product engineering project.',
      },
      expect.any(AbortSignal)
    );
    expect(await screen.findByRole('status')).toHaveTextContent('Message received.');
  });
});
