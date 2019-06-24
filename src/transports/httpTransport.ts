import {GenericObject} from "../entities/fields/utils";

export interface HttpTransport {
    get<T>(url: string, options?: HttpTransportOptions): Promise<T>;

    post<T>(url: string, options?: HttpTransportOptions): Promise<T>;

    delete<T>(url: string, options?: HttpTransportOptions): Promise<T>;

    put<T>(url: string, options?: HttpTransportOptions): Promise<T>;
}

export interface HttpTransportOptions {
    params?: GenericObject
    headers?: GenericObject
    body?: any
}