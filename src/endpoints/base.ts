import { YoutrackClient } from "../youtrack";
import * as format from "string-template";
import { generateFieldsQuery, GenericObject } from "../entities/fields/utils";
import {HttpTransportOptions} from "../transports/httpTransport";

export class BaseEndpoint {
    public constructor(protected client: YoutrackClient) {
    }

    protected format(template: string, values: {}): string {
        return format(template, values);
    }

    protected getResource<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.client.get<T>(url, options);
    }

    protected postResource<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.client.post<T>(url, options);
    }

    protected getResourceWithFields<T>(url: string, implementation: new () => object, options: { params?: GenericObject } = {}): Promise<T> {
        return this.getResource(url, {
            params: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.params || {})
            }
        })
    }

    protected postResourceWithFields<T>(url: string, implementation: new () => object, options: {
        params?: GenericObject,
        body?: any
    } = {}): Promise<T> {
        return this.postResource(url, {
            ...options,
            params: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.params || {})
            }
        })
    }
}
