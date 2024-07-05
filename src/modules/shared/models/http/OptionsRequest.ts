export interface getOptions {
    url: string
    query?: { [key: string]: any }
    abortController?: AbortController
    headers: { [key: string]: any }
}

export interface nonGetOptions {
    url: string
    data?: BodyInit | null | any
    abortController?: AbortController
    headers?: { [key: string]: any }
    isFormData?: boolean
}
