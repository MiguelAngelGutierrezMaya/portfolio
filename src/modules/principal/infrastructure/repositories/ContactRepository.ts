import type {HttpMethods} from "../../../shared/models/http/HttpController.ts";
import FetchHttpClient from "../../../shared/infrastructure/http/FetchHttpClient.ts";
import type {DataToSendEmail} from "../../models/controllers/ContactController.ts";
import type {GenericResponse} from "../../../shared/models/GenericResponse.ts";
import type {nonGetOptions} from "../../../shared/models/http/OptionsRequest.ts";
import {MakeHttpRequestUseCase} from "../../../shared/application/MakeHttpRequestUseCase.ts";

const PUBLIC_EMAIL_URL = import.meta.env.PUBLIC_EMAIL_URL;

export class ContactRepository {
    //
    // Properties
    //
    private readonly client: HttpMethods
    private readonly url: string
    private abortController: AbortController

    constructor() {
        this.client = new FetchHttpClient()
        this.url = PUBLIC_EMAIL_URL
        this.abortController = new AbortController()
    }

    //
    // abort
    //
    public abort(): void {
        this.abortController.abort()
        this.abortController = new AbortController()
    }

    //
    // Send email
    // @param data: DataToSendEmail
    // @returns Promise<GenericResponse>
    //
    public async sendEmail(data: DataToSendEmail): Promise<GenericResponse> {
        const options: nonGetOptions = {
            url: `${this.url}/email/send`,
            abortController: this.abortController,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        }

        return MakeHttpRequestUseCase.makePostRequest(this.client, options)
    }
}