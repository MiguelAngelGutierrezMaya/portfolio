import type {
  DataToSendEmail,
  IContactController,
} from '@principal/models/controllers/ContactController';

/**
 * ContactUseCases handles all business logic related to contact functionality
 * Contains methods for sending emails and other contact-related operations
 */
export class ContactUseCases {
  /**
   * Sends an email through the provided contact controller
   *
   * @param controller - The controller implementation that will handle the email sending
   * @param data - The email data payload containing recipient, template, and message information
   * @returns A promise that resolves to a boolean indicating success or failure
   */
  static async sendEmail(controller: IContactController, data: DataToSendEmail): Promise<boolean> {
    return await controller.sendEmail(data);
  }
}
