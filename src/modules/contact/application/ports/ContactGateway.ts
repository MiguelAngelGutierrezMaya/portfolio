import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';
import type { Locale } from '@i18n/domain/Locale';

export interface ContactGatewayContext {
  readonly elapsedMs?: number;
  readonly honeypot?: string;
  readonly sourceIp?: string;
  readonly locale?: Locale;
}

export interface ContactGateway {
  send(
    message: ContactMessage,
    signal?: AbortSignal,
    context?: ContactGatewayContext
  ): Promise<ContactResult>;
}
