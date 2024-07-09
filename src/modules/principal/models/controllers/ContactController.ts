export interface EmailTemplate {
    from_name: string,
    to_name: string,
    message: string
}

export interface DataToSendEmail {
    service_id: string,
    template_id: string,
    user_id: string,
    template_params: EmailTemplate
}

export interface IContactController {
    sendEmail(data: DataToSendEmail): Promise<boolean>
}