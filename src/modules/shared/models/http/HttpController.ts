import type { GenericResponse } from '@shared/models/GenericResponse';
import type { GetOptions, NonGetOptions } from '@shared/models/http/OptionsRequest';

//
// This interface is used to define the methods that the HttpController should have.
// It has the methods get, post, put, patch and delete.
// @author Miguel > 2024-03-12
//
export interface HttpMethods {
  get: (options: GetOptions) => Promise<GenericResponse>;
  post: (options: NonGetOptions) => Promise<GenericResponse>;
  put: (options: NonGetOptions) => Promise<GenericResponse>;
  patch: (options: NonGetOptions) => Promise<GenericResponse>;
  delete: (options: NonGetOptions) => Promise<GenericResponse>;
}
