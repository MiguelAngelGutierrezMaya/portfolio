import {GenericResponse} from '../models/GenericResponse'
import type {HttpMethods} from '../models/http/HttpController'
import type {getOptions, nonGetOptions} from '../models/http/OptionsRequest'

//
// This class is used to define the use case to make a request to the server.
// It has the methods makeGetRequest, makePostRequest, makePutRequest, makePatchRequest and makeDeleteRequest.
// Each method receives the client and the options and returns a Promise of a GenericResponse.
// @author Miguel > 2024-03-12
//
export class MakeHttpRequestUseCase {
    //
    // This method is used to make a GET request to the server.
    // It receives the client and the options and returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    static async makeGetRequest(
        client: HttpMethods,
        options: getOptions
    ): Promise<GenericResponse> {
        return await client.get(options)
    }

    //
    // This method is used to make a POST request to the server.
    // It receives the client and the options and returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    static async makePostRequest(
        client: HttpMethods,
        options: nonGetOptions
    ): Promise<GenericResponse> {
        return await client.post(options)
    }

    //
    // This method is used to make a PUT request to the server.
    // It receives the client and the options and returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    static async makePutRequest(
        client: HttpMethods,
        options: nonGetOptions
    ): Promise<GenericResponse> {
        return await client.put(options)
    }

    //
    // This method is used to make a PATCH request to the server.
    // It receives the client and the options and returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    static async makePatchRequest(
        client: HttpMethods,
        options: nonGetOptions
    ): Promise<GenericResponse> {
        return await client.patch(options)
    }

    //
    // This method is used to make a DELETE request to the server.
    // It receives the client and the options and returns a Promise of a GenericResponse.
    // @author Miguel > 2024-03-12
    //
    static async makeDeleteRequest(
        client: HttpMethods,
        options: nonGetOptions
    ): Promise<GenericResponse> {
        return await client.delete(options)
    }
}
