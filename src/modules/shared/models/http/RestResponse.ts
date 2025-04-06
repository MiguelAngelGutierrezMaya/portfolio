import { GenericResponse } from '@shared/models/GenericResponse';
import { StatusCodes } from '@shared/models/http/StatusCodes';

//
// This class is used to define the response of the Rest API.
// It extends from the GenericResponse class.
// It has the properties status, message, data and code.
// It has a constructor that receives the status, message, data and code.
//
export class RestResponse extends GenericResponse {
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
    super({ status, message, data, code });
  }
}

//
// ResponseData interface
// - status: number
// - message: string
// - data: Record<string, unknown>
//
interface ResponseData {
  status: number;
  message?: string;
  data: Record<string, unknown>;
}

//
// This class is used to define the response of the Rest API.
// It has the method process that receives the response and returns a GenericResponse.
// @author Miguel > 2024-03-12
//
export class RestResponseFactory {
  //
  // This method is used to process the response of the Rest API.
  // It receives the response and returns a GenericResponse.
  // @param response: ResponseData
  // @returns GenericResponse
  // @author Miguel > 2024-03-12
  //
  process({ response }: { response: ResponseData }): GenericResponse {
    const code: number = response?.status || StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR;

    switch (code) {
      case StatusCodes.HTTP_200_OK:
        return new RestResponse({
          status: true,
          message: '',
          code: code,
          data: response.data,
        });
      case StatusCodes.HTTP_201_CREATED:
        return new RestResponse({
          status: true,
          message: response.message || '',
          code: code,
          data: response.data,
        });
      case StatusCodes.HTTP_400_BAD_REQUEST:
        return new RestResponse({
          status: false,
          message: response.message || '',
          code: code,
          data: response.data,
        });
      case StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR:
        return new RestResponse({
          status: false,
          message: response.message || '',
          code: code,
          data: response.data,
        });
      case StatusCodes.HTTP_404_NOT_FOUND:
        return new RestResponse({
          status: false,
          message: response.message || '',
          code: code,
          data: response.data || {},
        });
      case StatusCodes.HTTP_409_CONFLICT:
        return new RestResponse({
          status: false,
          message: response.message || '',
          code: code,
          data: response.data,
        });
      default:
        return new RestResponse({
          status: false,
          message: 'Ha ocurrido un error inesperado',
          code: code,
          data: response.data,
        });
    }
  }
}
