import type { GenericResponse } from '@shared/models/GenericResponse';
import type { HttpMethods } from '@shared/models/http/HttpController';
import type { GetOptions, NonGetOptions } from '@shared/models/http/OptionsRequest';

/**
 * Provides a unified interface for making HTTP requests
 * Implements methods for different HTTP methods (GET, POST, PUT, PATCH, DELETE)
 *
 * @author Miguel > 2024-03-12
 */
export class MakeHttpRequestUseCase {
  /**
   * Makes a GET request to the server
   *
   * @param client - HTTP client implementation
   * @param options - Request options including URL, params, and headers
   * @returns Promise resolving to a generic response with status and data
   * @author Miguel > 2024-03-12
   */
  static async makeGetRequest(client: HttpMethods, options: GetOptions): Promise<GenericResponse> {
    return await client.get(options);
  }

  /**
   * Makes a POST request to the server
   *
   * @param client - HTTP client implementation
   * @param options - Request options including URL, data, and headers
   * @returns Promise resolving to a generic response with status and data
   * @author Miguel > 2024-03-12
   */
  static async makePostRequest(
    client: HttpMethods,
    options: NonGetOptions
  ): Promise<GenericResponse> {
    return await client.post(options);
  }

  /**
   * Makes a PUT request to the server
   *
   * @param client - HTTP client implementation
   * @param options - Request options including URL, data, and headers
   * @returns Promise resolving to a generic response with status and data
   * @author Miguel > 2024-03-12
   */
  static async makePutRequest(
    client: HttpMethods,
    options: NonGetOptions
  ): Promise<GenericResponse> {
    return await client.put(options);
  }

  /**
   * Makes a PATCH request to the server
   *
   * @param client - HTTP client implementation
   * @param options - Request options including URL, data, and headers
   * @returns Promise resolving to a generic response with status and data
   * @author Miguel > 2024-03-12
   */
  static async makePatchRequest(
    client: HttpMethods,
    options: NonGetOptions
  ): Promise<GenericResponse> {
    return await client.patch(options);
  }

  /**
   * Makes a DELETE request to the server
   *
   * @param client - HTTP client implementation
   * @param options - Request options including URL, data, and headers
   * @returns Promise resolving to a generic response with status and data
   * @author Miguel > 2024-03-12
   */
  static async makeDeleteRequest(
    client: HttpMethods,
    options: NonGetOptions
  ): Promise<GenericResponse> {
    return await client.delete(options);
  }
}
