import {HttpTransport} from "../transports/httpTransport";

export interface YoutrackOptions {
    baseUrl: string;
    token: string;
    transport?: HttpTransport
}