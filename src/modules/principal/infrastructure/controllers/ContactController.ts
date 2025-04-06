import type {
  DataToSendEmail,
  IContactController,
} from '@principal/models/controllers/ContactController';
import { ContactRepository } from '@principal/infrastructure/repositories/ContactRepository';
import type { IAbortController } from '@shared/models/controllers/AbortController';
import type { GenericResponse } from '@shared/models/GenericResponse';

/**
 * ContactController implements contact operations and handles communication with repositories
 * Provides functionality for sending emails and manages abort operations
 */
export class ContactController implements IContactController, IAbortController {
  /**
   * Repository for handling contact-related data operations
   * @private
   */
  private contactRepository: ContactRepository;

  /**
   * Initializes a new ContactController with its dependencies
   */
  constructor() {
    this.contactRepository = new ContactRepository();
  }

  /**
   * Aborts any ongoing contact operations
   */
  abort(): void {
    this.contactRepository.abort();
  }

  /**
   * Sends an email with the provided data
   *
   * @param data - Email data including service details and content
   * @returns Promise resolving to success or failure boolean
   */
  async sendEmail(data: DataToSendEmail): Promise<boolean> {
    const response: GenericResponse = await this.contactRepository.sendEmail(data);
    return response.status;
  }
}
