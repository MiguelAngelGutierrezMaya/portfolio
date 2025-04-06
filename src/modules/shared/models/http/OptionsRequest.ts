export interface GetOptions {
  url: string;
  abortController?: AbortController;
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

export interface NonGetOptions extends Omit<GetOptions, 'queryParams'> {
  data?: Record<string, unknown>;
}

/**
 * Function to prepare URL with optional query parameters.
 *
 * @param url Base URL
 * @param params Optional query parameters object
 * @returns URL with query parameters if provided
 */
export const prepareUrl = (
  url: string,
  params?: Record<string, string | number | boolean>
): string => {
  if (!params) return url;

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });

  return `${url}?${queryParams.toString()}`;
};

/**
 * Function to determine HTTP request content type based on the data.
 *
 * @param data Request data
 * @returns Content-Type header value
 */
export const getContentType = (data: Record<string, unknown> | FormData): string => {
  return data instanceof FormData ? 'multipart/form-data' : 'application/json';
};
