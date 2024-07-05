import type {DataToSendEmail, IContactController} from "../../models/controllers/ContactController.ts";
import {ContactRepository} from "../repositories/ContactRepository.ts";
import type {IAbortController} from "../../../shared/models/controllers/AbortController.ts";
import type {GenericResponse} from "../../../shared/models/GenericResponse.ts";

export class ContactController implements IContactController, IAbortController {
    //
    // Attributes
    //
    private contactRepository: ContactRepository

    constructor() {
        this.contactRepository = new ContactRepository()
    }

    //
    // abort
    // @returns void
    //
    abort(): void {
        this.contactRepository.abort()
    }

    //
    // Send email
    // @param data
    // @return Promise<void>
    //
    async sendEmail(data: DataToSendEmail): Promise<boolean> {
        const response: GenericResponse = await this.contactRepository.sendEmail(data)
        return response.status;
    }

}