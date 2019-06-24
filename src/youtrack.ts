import {YoutrackOptions} from "./options/youtrack_options";
import {UserEndpoint} from "./endpoints/user";
import {TagEndpoint} from "./endpoints/tag";
import {IssueEndpoint} from "./endpoints/issue";
import {ProjectEndpoint} from "./endpoints/project";
import {AgileEndpoint} from "./endpoints/agile";
import {SprintEndpoint} from "./endpoints/sprint";
import {WorkItemEndpoint} from "./endpoints/workitem";
import {CommentEndpoint} from "./endpoints/comment";
import {HttpTransport, HttpTransportOptions} from "./transports/httpTransport";
import {RequestPromiseTransport} from "./transports/requestPromiseTransport";
import {TimeTrackingSettingsEndpoint} from "./endpoints/timeTrackingSettings";

export interface YoutrackClient {

    readonly users: UserEndpoint;
    readonly tags: TagEndpoint;
    readonly issues: IssueEndpoint;
    readonly projects: ProjectEndpoint;
    readonly agiles: AgileEndpoint;
    readonly sprints: SprintEndpoint;
    readonly workItems: WorkItemEndpoint;
    readonly comments: CommentEndpoint;

    get<T>(url: string, params?: {}, headers?: {}): Promise<T>;

    post<T>(url: string, params?: {}, headers?: {}): Promise<T>;

    delete<T>(url: string, params?: {}, headers?: {}): Promise<T>;

    put<T>(url: string, params?: {}, headers?: {}): Promise<T>;
}

interface RequestHeaders {
    [key: string]: any;
}

export class Youtrack implements YoutrackClient {

    public readonly users: UserEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly agiles: AgileEndpoint;
    public readonly sprints: SprintEndpoint;
    public readonly workItems: WorkItemEndpoint;
    public readonly comments: CommentEndpoint;
    public readonly timeTrackingSettings: TimeTrackingSettingsEndpoint;
    private readonly baseUrl: string;
    private defaultRequestHeaders: RequestHeaders;
    private transport: HttpTransport;

    public constructor(options: YoutrackOptions) {
        this.defaultRequestHeaders = {
            Authorization: `Bearer ${options.token}`
        };
        this.transport = options.transport ? options.transport : new RequestPromiseTransport();
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.agiles = new AgileEndpoint(this);
        this.sprints = new SprintEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
        this.comments = new CommentEndpoint(this);
        this.timeTrackingSettings = new TimeTrackingSettingsEndpoint(this);
    }

    public post<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.transport.post<T>(this.baseUrl + url, this.prepareParams(options));
    }

    public get<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.transport.get<T>(this.baseUrl + url, this.prepareParams(options));
    }

    public delete<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.transport.delete<T>(this.baseUrl + url, this.prepareParams(options));
    }

    public put<T>(url: string, options: HttpTransportOptions = {}): Promise<T> {
        return this.transport.put<T>(this.baseUrl + url, this.prepareParams(options));
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/api$/i)) {
            baseUrl += "/api";
        }
        return baseUrl;
    }

    private prepareParams(options: HttpTransportOptions): {} {
        if ('headers' in options) {
            return {
                ...options,
                headers: {
                    ...options.headers,
                    ...this.defaultRequestHeaders
                }
            };
        }
        return {
            ...options,
            headers: this.defaultRequestHeaders
        };
    }
}
