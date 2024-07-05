import {GenericResponse} from '../GenericResponse'
import type {getOptions, nonGetOptions} from './OptionsRequest'

//
// This interface is used to define the methods that the HttpController should have.
// It has the methods get, post, put, patch and delete.
// @author Miguel > 2024-03-12
//
export interface HttpMethods {
    get: (options: getOptions) => Promise<GenericResponse>
    post: (options: nonGetOptions) => Promise<GenericResponse>
    put: (options: nonGetOptions) => Promise<GenericResponse>
    patch: (options: nonGetOptions) => Promise<GenericResponse>
    delete: (options: nonGetOptions) => Promise<GenericResponse>
}
