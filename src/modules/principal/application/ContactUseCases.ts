import type {DataToSendEmail, IContactController} from "../models/controllers/ContactController.ts";

export class ContactUseCases {
    //
    // Send email
    // @param controller
    // @param data
    // @returns
    //
    static async sendEmail(controller: IContactController, data: DataToSendEmail): Promise<boolean> {
        return await controller.sendEmail(data);
    }
}