import type { HttpMethods } from '@shared/models/http/HttpController';
import FetchHttpClient from '@shared/infrastructure/http/FetchHttpClient';
import type { DataToSendEmail } from '@principal/models/controllers/ContactController';
import type { GenericResponse } from '@shared/models/GenericResponse';
import type { NonGetOptions } from '@shared/models/http/OptionsRequest';
import { MakeHttpRequestUseCase } from '@shared/application/MakeHttpRequestUseCase';

const PUBLIC_EMAIL_URL = import.meta.env.PUBLIC_EMAIL_URL;

/**
 * ContactRepository handles data operations related to contact functionality
 * Manages API calls to the email service and local data manipulation
 */
export class ContactRepository {
  /**
   * HTTP client for making API requests
   * @private
   */
  private readonly client: HttpMethods;
  /**
   * Base URL for email service API
   * @private
   */
  private readonly url: string;
  /**
   * Controller to manage aborting ongoing requests
   * @private
   */
  private abortController: AbortController;

  /**
   * Initializes a new ContactRepository with its dependencies
   */
  constructor() {
    this.client = new FetchHttpClient();
    this.url = PUBLIC_EMAIL_URL;
    this.abortController = new AbortController();
  }

  /**
   * Aborts any ongoing repository operations and resets the abort controller
   */
  public abort(): void {
    this.abortController.abort();
    this.abortController = new AbortController();
  }

  /**
   * Sends an email through the email service API
   *
   * @param data - Email data including service details and content
   * @returns Promise resolving to a generic response containing status and data
   */
  public async sendEmail(data: DataToSendEmail): Promise<GenericResponse> {
    const options: NonGetOptions = {
      url: `${this.url}/email/send`,
      abortController: this.abortController,
      data: data as unknown as Record<string, unknown>,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    return MakeHttpRequestUseCase.makePostRequest(this.client, options);
  }
}
