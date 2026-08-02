import type { ContactGateway } from '@contact/application/ports/ContactGateway';
import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';

interface HttpContactGatewayConfig {
  endpoint: string;
  serviceId: string;
  templateId: string;
  userId: string;
}

export class HttpContactGateway implements ContactGateway {
  constructor(private readonly config: HttpContactGatewayConfig) {}

  async send(message: ContactMessage, signal?: AbortSignal): Promise<ContactResult> {
    if (!this.config.endpoint) {
      return {
        success: false,
        message: 'The contact service is not configured yet. Please use email or LinkedIn.',
      };
    }

    try {
      const response = await fetch(`${this.config.endpoint}/email/send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: this.config.serviceId,
          template_id: this.config.templateId,
          user_id: this.config.userId,
          template_params: {
            from_name: `${message.name} — ${message.email}`,
            to_name: 'Miguel Angel',
            message: message.message,
          },
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`Contact service returned ${response.status}`);
      }

      return {
        success: true,
        message: 'Message received. I will get back to you as soon as possible.',
      };
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { success: false, message: 'The request was cancelled.' };
      }

      return {
        success: false,
        message: 'I could not send the message. Please try again or contact me by email.',
      };
    }
  }
}

export const createHttpContactGateway = (): HttpContactGateway =>
  new HttpContactGateway({
    endpoint: import.meta.env.PUBLIC_EMAIL_URL ?? '',
    serviceId: import.meta.env.PUBLIC_EMAIL_SERVICE_ID ?? '',
    templateId: import.meta.env.PUBLIC_EMAIL_TEMPLATE_ID ?? '',
    userId: import.meta.env.PUBLIC_EMAIL_USER_ID ?? '',
  });
