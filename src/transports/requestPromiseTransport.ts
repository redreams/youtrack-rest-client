import * as request from "request-promise";
import {RequestPromise} from "request-promise";
import {HttpTransportOptions, HttpTransport} from "./httpTransport";
import BaseTransport from "./baseTransport";

export class RequestPromiseTransport extends BaseTransport implements HttpTransport {
    private readonly defaultConfig = {
        json: true,
        jar: true
    };

    delete<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.toPromise<T>(request.delete(url, this.prepareParams(options)))
    }

    get<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.toPromise<T>(request.get(url, this.prepareParams(options)))
    }

    post<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.toPromise<T>(request.post(url, this.prepareParams(options)))
    }

    put<T>(url: string, options?: HttpTransportOptions): Promise<T> {
        return this.toPromise<T>(request.put(url, this.prepareParams(options)))
    }

    private toPromise<T>(request: RequestPromise): Promise<T> {
        return Promise.resolve(request.then(response => {
            return response;
        }).catch(error => {
            return Promise.reject(error);
        }));
    }

    private prepareParams(options?: HttpTransportOptions) {
        return {...super.prepareTransportParams({
                headers: 'headers',
                params: 'qs',
                body: 'body'
            }, options), ...this.defaultConfig};
    };
}