import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';

export interface ContactGateway {
  send(message: ContactMessage, signal?: AbortSignal): Promise<ContactResult>;
}
