/**
 * Email template structure required by email service provider
 */
export interface EmailTemplate {
  /** Name of the sender */
  from_name: string;
  /** Name of the recipient */
  to_name: string;
  /** Content of the email message */
  message: string;
}

/**
 * Data structure required to send an email through the email service
 */
export interface DataToSendEmail {
  /** Service ID provided by the email service */
  service_id: string;
  /** Template ID for the email format */
  template_id: string;
  /** User ID for authentication with email service */
  user_id: string;
  /** Template parameters including sender, recipient and message content */
  template_params: EmailTemplate;
}

/**
 * Interface for contact-related controller operations
 */
export interface IContactController {
  /**
   * Sends an email with the given data
   * @param data - Email data including service details and content
   * @returns Promise resolving to success or failure boolean
   */
  sendEmail(data: DataToSendEmail): Promise<boolean>;
}
