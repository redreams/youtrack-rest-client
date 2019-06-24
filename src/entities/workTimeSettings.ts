export class WorkTimeSettingsImpl {
    id?: string = '';
    minutesADay?: number = 0;
    workDays?: number[] = [];
    firstDayOfWeek?: number = 0;
    daysAWeek?: number = 0;
}

export interface WorkTimeSettings extends WorkTimeSettingsImpl {
}

export interface UpdateWorkTimeSettings extends WorkTimeSettings {
    id: string;
}