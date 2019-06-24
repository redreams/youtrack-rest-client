import {BaseEndpoint} from "./base";
import {GlobalTimeTrackingSettings} from "../entities/globalTimeTrackingSettings";
import {WorkItemTypeEndpoint} from "./workItemType";
import {YoutrackClient} from "../youtrack";
import {WorkTimeSettingsEndpoint} from "./workTimeSettings";

export const TimeTrackingSettingsPaths = {
    global: '/admin/timeTrackingSettings',
};

export class TimeTrackingSettingsEndpoint extends BaseEndpoint {
    public readonly workItemTypes: WorkItemTypeEndpoint;
    public readonly workTimeSettings: WorkTimeSettingsEndpoint;

    constructor(client: YoutrackClient) {
        super(client);
        this.workItemTypes = new WorkItemTypeEndpoint(client, TimeTrackingSettingsPaths.global);
        this.workTimeSettings = new WorkTimeSettingsEndpoint(client, TimeTrackingSettingsPaths.global);
    }

    public get(): Promise<GlobalTimeTrackingSettings> {
        return this.client.get<GlobalTimeTrackingSettings>(TimeTrackingSettingsPaths.global);
    }
}