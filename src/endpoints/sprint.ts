import { BaseEndpoint } from "./base";
import { Sprint, SprintImpl, ReducedSprint, ReducedSprintImpl, NewSprint, UpdateSprint } from "..";

export const SprintPaths = {
    sprints: '/agile/{agileId}/sprints',
    sprint: '/agile/{agileId}/sprints/{sprintId}'
}


export class SprintEndpoint extends BaseEndpoint {

    public all(agileId: string): Promise<ReducedSprint[]> {
        return this.getResourceWithFields<ReducedSprint[]>(this.format(SprintPaths.sprints, { agileId }), ReducedSprintImpl);
    }

    public byId(agileId: string, sprintId: string): Promise<Sprint> {
        return this.getResourceWithFields<Sprint>(this.format(SprintPaths.sprint, { agileId, sprintId }), SprintImpl);
    }

    public delete(agileId: string, sprintId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(SprintPaths.sprint, { agileId, sprintId })));
    }

    public create(agileId: string, sprint: NewSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(this.format(SprintPaths.sprints, { agileId }), SprintImpl, {
            body: sprint
        });
    }

    public update(agileId: string, sprint: UpdateSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(this.format(SprintPaths.sprints, { 
            agileId, sprintId: sprint.id 
        }), SprintImpl, { 
            body: sprint 
        });
    }
}