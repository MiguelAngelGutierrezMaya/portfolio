/**
 * Model for the generic response from the server
 * Standardizes API responses across the application
 * Contains status, message, data payload and HTTP code
 *
 * @author Miguel > 2024-03-12
 */
export class GenericResponse {
  /** Indicates whether the operation was successful */
  status: boolean;
  /** Descriptive message about the operation result */
  message: string;
  /** Payload containing any response data */
  data: Record<string, unknown>;
  /** HTTP status code */
  code: number;

  /**
   * Creates a new GenericResponse instance
   *
   * @param status - Boolean indicating success or failure
   * @param message - Descriptive message about the operation
   * @param data - Response payload data
   * @param code - HTTP status code
   */
  constructor({
    status,
    message,
    data,
    code,
  }: {
    status: boolean;
    message: string;
    data: Record<string, unknown>;
    code: number;
  }) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.code = code;
  }
}
