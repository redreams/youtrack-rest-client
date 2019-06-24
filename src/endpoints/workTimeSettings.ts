import {BaseEndpoint} from "./base";
import {UpdateWorkTimeSettings, WorkTimeSettings, WorkTimeSettingsImpl} from "../entities/workTimeSettings";
import {YoutrackClient} from "../youtrack";

export const WorkTimeSettingsPaths = {
    workTimeSettings: '/workTimeSettings',
    workTimeSettingsSpecific: '/workTimeSettings/{id}'
};

export class WorkTimeSettingsEndpoint extends BaseEndpoint {
    private readonly baseUrl: string;

    constructor(client: YoutrackClient, baseUrl: string) {
        super(client);
        this.baseUrl = baseUrl;
    }

    public get(): Promise<WorkTimeSettings> {
        return this.getResourceWithFields(
            this.baseUrl + WorkTimeSettingsPaths.workTimeSettings,
            WorkTimeSettingsImpl
        );
    }

    public byId(id: string): Promise<WorkTimeSettings> {
        return this.getResourceWithFields(
            this.baseUrl + this.format(WorkTimeSettingsPaths.workTimeSettingsSpecific, {id}),
            WorkTimeSettingsImpl
        );
    }

    public update(workTimeSettings: UpdateWorkTimeSettings): Promise<WorkTimeSettings> {
        return this.postResourceWithFields(
            this.baseUrl + this.format(WorkTimeSettingsPaths.workTimeSettingsSpecific, {id: workTimeSettings.id}),
            WorkTimeSettingsImpl
        );
    }
}
