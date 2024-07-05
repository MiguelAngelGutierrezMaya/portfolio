//
// Purpose: Model for the generic response from the server.
// It has the properties status, message, data and code.
// It has a constructor that receives the status, message, data and code.
// It is used to define the response of the Rest API.
// @author Miguel > 2024-03-12
//
export class GenericResponse {
    status: boolean
    message: string
    data: { [key: string]: any }
    code: number

    constructor({
                    status,
                    message,
                    data,
                    code
                }: {
        status: boolean
        message: string
        data: { [key: string]: any }
        code: number
    }) {
        this.status = status
        this.message = message
        this.data = data
        this.code = code
    }
}
