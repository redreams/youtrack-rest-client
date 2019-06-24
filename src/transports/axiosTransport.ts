import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {HttpTransport, HttpTransportOptions} from "./httpTransport";
import BaseTransport from "./baseTransport";

export default class AxiosTransport extends BaseTransport implements HttpTransport {
    private axios: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        super();
        this.axios = axiosInstance ? axiosInstance : axios;
    }
    delete<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.request<T>({
            url,
            method: "DELETE",
            ...this.prepareParams(options)
        });
    }

    get<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.request<T>({
            url,
            method: "GET",
            ...this.prepareParams(options)
        });
    }

    post<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.request<T>({
            url,
            method: "POST",
            ...this.prepareParams(options)
        });
    }

    put<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.request<T>({
            url,
            method: "PUT",
            ...this.prepareParams(options)
        });
    }

    private request<T>(config: AxiosRequestConfig): Promise<T> {
        return this.axios.request<T>(config)
            .then(response => response.data);
    }

    private prepareParams(options?: HttpTransportOptions) {
        return super.prepareTransportParams({
            params: 'params',
            body: 'data',
            headers: 'headers'
        }, options);
    }
}