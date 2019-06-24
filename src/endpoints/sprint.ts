import { BaseEndpoint } from "./base";
import { PaginationOptions } from "../options/pagination_options";
import {NewSprint, ReducedSprint, ReducedSprintImpl, Sprint, SprintImpl, UpdateSprint} from "../entities/sprint";

export const SprintPaths = {
    sprints: '/agiles/{agileId}/sprints',
    sprint: '/agiles/{agileId}/sprints/{sprintId}'
};

export class SprintEndpoint extends BaseEndpoint {

    public all(agileId: string, paginationOptions: PaginationOptions = {}): Promise<ReducedSprint[]> {
        return this.getResourceWithFields<ReducedSprint[]>(this.format(SprintPaths.sprints, { agileId }), ReducedSprintImpl, { params: paginationOptions });
    }

    public byId(agileId: string, sprintId: string): Promise<Sprint> {
        return this.getResourceWithFields<Sprint>(this.format(SprintPaths.sprint, { agileId, sprintId }), SprintImpl);
    }

    public delete(agileId: string, sprintId: string): Promise<any> {
        return this.client.delete(this.format(SprintPaths.sprint, { agileId, sprintId }));
    }

    public create(agileId: string, sprint: NewSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(this.format(SprintPaths.sprints, { agileId }), SprintImpl, {
            body: sprint
        });
    }

    public update(agileId: string, sprint: UpdateSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(this.format(SprintPaths.sprint, {
            agileId, sprintId: sprint.id
        }), SprintImpl, {
            body: sprint
        });
    }
}
