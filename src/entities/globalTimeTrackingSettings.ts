import {WorkItemType} from "./workItemType";
import {WorkTimeSettings, WorkTimeSettingsImpl} from "./workTimeSettings";

export class GlobalTimeTrackingSettingsImpl {
    workItemTypes?: WorkItemType[] = [];
    workTimeSettings?: WorkTimeSettings = new WorkTimeSettingsImpl();
}

export interface GlobalTimeTrackingSettings extends GlobalTimeTrackingSettingsImpl {
}