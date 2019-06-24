export class WorkItemTypeImpl {
    id?: string = '';
    name?: string | null = null;
    autoAttached: boolean = false;
}

export interface WorkItemType extends WorkItemTypeImpl {
}

export interface NewWorkItemType extends WorkItemType {
    name: string | null;
}

export interface UpdateWorkItemType extends WorkItemType {
    id: string;
}

