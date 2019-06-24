import {HttpTransportOptions} from "./httpTransport";

export default class BaseTransport {
    protected prepareTransportParams(keyMap: {
        headers: string,
        params: string,
        body: string
    }, options?: HttpTransportOptions): Params {
        let params: Params = {};
        if (options) {
            if (options.params) {
                params[keyMap.params] = options.params;
            }
            if (options.body) {
                params[keyMap.body] = options.body;
            }
            if (options.headers) {
                params[keyMap.headers] = options.headers;
            }
        }
        return params;
    }
}

export interface Params {
    [key: string]: any;
}