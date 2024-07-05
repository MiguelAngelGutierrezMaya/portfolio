import {GenericResponse} from '../../models/GenericResponse'
import {RestResponseFactory} from '../../models/http/RestResponse'
import {StatusCodes} from '../../models/http/StatusCodes'
import type {getOptions, nonGetOptions} from '../../models/http/OptionsRequest'
import type {HttpMethods} from '../../models/http/HttpController'

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
    async get({url, query, abortController, headers}: getOptions) {
        const parsedUrl = new URL(url)

        if (query) {
            Object.keys(query).forEach((key) => {
                // validate if element is an array and if it is, then add each element to the query
                if (Array.isArray(query[key])) {
                    query[key].forEach((element: string) => {
                        parsedUrl.searchParams.append(`${key}[]`, element)
                    })
                } else {
                    parsedUrl.searchParams.append(key, query[key])
                }
            })
        }

        try {
            const response: Response = await fetch(parsedUrl.toString(), {
                method: 'GET',
                headers: headers || undefined,
                signal: abortController?.signal
            })

            const parsedResponse: { [key: string]: any } = await response.json()

            return new RestResponseFactory().process({
                response: {
                    status: response.status || parsedResponse.status || parsedResponse.code,
                    data: parsedResponse
                }
            })
        } catch (e: unknown) {
            const error = e as { code?: number; message?: string }

            return new RestResponseFactory().process({
                response: {
                    status: error.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
                    data: {},
                    message: error?.message || 'Error in the request get method.'
                }
            })
        }
    }

    //
    // This method is used to make a POST request to the server.
    // It receives the url, the data, the headers and the abortController.
    // It returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    async post({
                   url,
                   data,
                   headers,
                   abortController,
                   isFormData
               }: nonGetOptions) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
                headers: headers || undefined,
                signal: abortController?.signal
            })

            let parsedResponse: { [key: string]: any }

            if (response.headers.get('Content-Type')?.includes('text/plain')) {
                parsedResponse = {}
            } else {
                parsedResponse = await response.json()
            }

            return new RestResponseFactory().process({
                response: {
                    status: response.status || parsedResponse.status || parsedResponse.code,
                    data: {...parsedResponse}
                }
            })
        } catch (e: unknown) {
            const error = e as { code?: number; message?: string }

            return new RestResponseFactory().process({
                response: {
                    data: {},
                    status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
                    message: error?.message || 'Error in the request post method.'
                }
            })
        }
    }

    //
    // This method is used to make a PUT request to the server.
    // It receives the url, the data, the headers and the abortController.
    // It returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    async put({url, data, headers, abortController}: nonGetOptions) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: headers || undefined,
                signal: abortController?.signal
            })
            const parsedResponse: { [key: string]: any } = await response.json()

            return new RestResponseFactory().process({
                response: {
                    status: response.status || parsedResponse.status || parsedResponse.code,
                    data: {...parsedResponse}
                }
            })
        } catch (e: unknown) {
            const error = e as { code?: number; message?: string }

            return new RestResponseFactory().process({
                response: {
                    data: {},
                    status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
                    message: error?.message || 'Error in the request put method'
                }
            })
        }
    }

    //
    // This method is used to make a PATCH request to the server.
    // It receives the url, the data, the headers and the abortController.
    // It returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    async patch({url, data, headers, abortController}: nonGetOptions) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: headers || undefined,
                signal: abortController?.signal
            })
            const parsedResponse: { [key: string]: any } = await response.json()

            return new RestResponseFactory().process({
                response: {
                    status: response.status || parsedResponse.status || parsedResponse.code,
                    data: {...parsedResponse}
                }
            })
        } catch (e: unknown) {
            const error = e as { code?: number; message?: string }

            return new RestResponseFactory().process({
                response: {
                    data: {},
                    status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
                    message: error?.message || 'Error in the request patch method'
                }
            })
        }
    }

    //
    // This method is used to make a DELETE request to the server.
    // It receives the url, the data, the headers and the abortController.
    // It returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    async delete({
                     url,
                     data,
                     headers,
                     abortController
                 }: nonGetOptions): Promise<GenericResponse> {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers || undefined,
                signal: abortController?.signal,
                body: JSON.stringify(data)
            })

            const parsedResponse: { [key: string]: any } = await response.json()

            return new RestResponseFactory().process({
                response: {
                    status: response.status || parsedResponse.status || parsedResponse.code,
                    data: {...parsedResponse}
                }
            })
        } catch (e: unknown) {
            const error = e as { code?: number; message?: string }

            return new RestResponseFactory().process({
                response: {
                    data: {},
                    status: error?.code || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
                    message: error?.message || 'Error in the request delete method'
                }
            })
        }
    }
}
