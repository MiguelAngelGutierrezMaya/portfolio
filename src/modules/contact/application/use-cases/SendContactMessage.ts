import type { ContactGateway } from '@contact/application/ports/ContactGateway';
import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';

export class SendContactMessage {
  static execute(
    gateway: ContactGateway,
    message: ContactMessage,
    signal?: AbortSignal
  ): Promise<ContactResult> {
    return gateway.send(
      {
        name: message.name.trim(),
        email: message.email.trim().toLowerCase(),
        message: message.message.trim(),
      },
      signal
    );
  }
}
