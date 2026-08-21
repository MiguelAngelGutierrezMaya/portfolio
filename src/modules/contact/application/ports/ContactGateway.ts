import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';

export interface ContactGatewayContext {
  readonly elapsedMs?: number;
  readonly honeypot?: string;
  readonly sourceIp?: string;
}

export interface ContactGateway {
  send(
    message: ContactMessage,
    signal?: AbortSignal,
    context?: ContactGatewayContext
  ): Promise<ContactResult>;
}
