import {BaseEndpoint} from "./base";
import {UpdateWorkItemType, WorkItemType, WorkItemTypeImpl} from "../entities/workItemType";
import {YoutrackClient} from "../youtrack";
import {PaginationOptions} from "../options/pagination_options";

export const WorkItemTypePaths = {
    workItems: '/workItemTypes',
    workItem: '/workItemTypes/{id}'
};

export class WorkItemTypeEndpoint extends BaseEndpoint {
    private readonly basePath: string;

    constructor(client: YoutrackClient, basePath: string) {
        super(client);
        this.basePath = basePath;
    }

    public all(paginationOptions: PaginationOptions = {}): Promise<WorkItemType[]> {
        return this.getResourceWithFields(
            this.basePath + WorkItemTypePaths.workItems,
            WorkItemTypeImpl,
            {params: {...paginationOptions}}
        );
    }

    public byId(id: string): Promise<WorkItemType> {
        return this.getResourceWithFields(
            this.basePath + this.format(WorkItemTypePaths.workItem, {id}),
            WorkItemTypeImpl
        );
    }

    public create(workItemType: WorkItemType): Promise<WorkItemType> {
        return this.postResourceWithFields(
            this.basePath + WorkItemTypePaths.workItems,
            WorkItemTypeImpl
        );
    }

    public update(workItemType: UpdateWorkItemType): Promise<WorkItemType> {
        return this.postResourceWithFields(
            this.basePath + this.format(WorkItemTypePaths.workItem, {id: workItemType.id}),
            WorkItemTypeImpl
        );
    }

    public delete(id: string): Promise<any> {
        return this.client.delete(this.basePath + this.format(WorkItemTypePaths.workItem, {id}));
    }
}