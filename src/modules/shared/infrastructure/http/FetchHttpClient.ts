import type { GenericResponse } from '@shared/models/GenericResponse';
import { RestResponseFactory } from '@shared/models/http/RestResponse';
import { StatusCodes } from '@shared/models/http/StatusCodes';
import type { GetOptions, NonGetOptions } from '@shared/models/http/OptionsRequest';
import type { HttpMethods } from '@shared/models/http/HttpController';

//
// This class is a simple implementation of the HttpMethods interface, it uses the fetch API to make the requests.
// It has the methods get, post, put, patch and delete.
// It receives the options as parameters and returns a Promise of a GenericResponse.
// @author Miguel > 2024-03-12
//
export default class FetchHttpClient implements HttpMethods {
  //
  // This method is used to make a GET request to the server.
  // It receives the url, the query, the abortController and the headers.
  // It returns a Promise of a GenericResponse.
  // @author Miguel > 2024-03-12
  //
  async get({ url, queryParams, abortController, headers }: GetOptions) {
    const parsedUrl = new URL(url);

    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        // validate if element is an array and if it is, then add each element to the query
        if (Array.isArray(queryParams[key])) {
          (queryParams[key] as string[]).forEach((element: string) => {
            parsedUrl.searchParams.append(`${key}[]`, element);
          });
        } else {
          parsedUrl.searchParams.append(key, String(queryParams[key]));
        }
      });
    }

    try {
      const response: Response = await fetch(parsedUrl.toString(), {
        method: 'GET',
        headers: headers || undefined,
        signal: abortController?.signal,
      });

      const parsedResponse: Record<string, unknown> = await response.json();

      return new RestResponseFactory().process({
        response: {
          status:
            response.status || (parsedResponse.status as number) || (parsedResponse.code as number),
          data: parsedResponse,
        },
      });
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };

      return new RestResponseFactory().process({
        response: {
          status: error.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
          data: {},
          message: error?.message || 'Error in the request get method.',
        },
      });
    }
  }

  //
  // This method is used to make a POST request to the server.
  // It receives the url, the data, the headers and the abortController.
  // It returns a Promise of a GenericResponse.
  // @author Miguel > 2024-03-12
  //
  async post({ url, data, headers, abortController }: NonGetOptions) {
    try {
      const isFormData = data instanceof FormData;
      const response = await fetch(url, {
        method: 'POST',
        body: isFormData ? (data as FormData) : JSON.stringify(data),
        headers: headers || undefined,
        signal: abortController?.signal,
      });

      let parsedResponse: Record<string, unknown>;

      if (response.headers.get('Content-Type')?.includes('text/plain')) {
        parsedResponse = {};
      } else {
        parsedResponse = await response.json();
      }

      return new RestResponseFactory().process({
        response: {
          status:
            response.status || (parsedResponse.status as number) || (parsedResponse.code as number),
          data: { ...parsedResponse },
        },
      });
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };

      return new RestResponseFactory().process({
        response: {
          data: {},
          status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
          message: error?.message || 'Error in the request post method.',
        },
      });
    }
  }

  //
  // This method is used to make a PUT request to the server.
  // It receives the url, the data, the headers and the abortController.
  // It returns a Promise of a GenericResponse.
  // @author Miguel > 2024-03-12
  //
  async put({ url, data, headers, abortController }: NonGetOptions) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headers || undefined,
        signal: abortController?.signal,
      });
      const parsedResponse: Record<string, unknown> = await response.json();

      return new RestResponseFactory().process({
        response: {
          status:
            response.status || (parsedResponse.status as number) || (parsedResponse.code as number),
          data: { ...parsedResponse },
        },
      });
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };

      return new RestResponseFactory().process({
        response: {
          data: {},
          status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
          message: error?.message || 'Error in the request put method',
        },
      });
    }
  }

  //
  // This method is used to make a PATCH request to the server.
  // It receives the url, the data, the headers and the abortController.
  // It returns a Promise of a GenericResponse.
  // @author Miguel > 2024-03-12
  //
  async patch({ url, data, headers, abortController }: NonGetOptions) {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: headers || undefined,
        signal: abortController?.signal,
      });
      const parsedResponse: Record<string, unknown> = await response.json();

      return new RestResponseFactory().process({
        response: {
          status:
            response.status || (parsedResponse.status as number) || (parsedResponse.code as number),
          data: { ...parsedResponse },
        },
      });
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };

      return new RestResponseFactory().process({
        response: {
          data: {},
          status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
          message: error?.message || 'Error in the request patch method',
        },
      });
    }
  }

  //
  // This method is used to make a DELETE request to the server.
  // It receives the url, the data, the headers and the abortController.
  // It returns a Promise of a GenericResponse.
  // @author Miguel > 2024-03-12
  //
  async delete({ url, data, headers, abortController }: NonGetOptions): Promise<GenericResponse> {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers || undefined,
        signal: abortController?.signal,
        body: data ? JSON.stringify(data) : undefined,
      });

      const parsedResponse: Record<string, unknown> = await response.json();

      return new RestResponseFactory().process({
        response: {
          status:
            response.status || (parsedResponse.status as number) || (parsedResponse.code as number),
          data: { ...parsedResponse },
        },
      });
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };

      return new RestResponseFactory().process({
        response: {
          data: {},
          status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
          message: error?.message || 'Error in the request delete method',
        },
      });
    }
  }
}
