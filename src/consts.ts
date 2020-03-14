import { Job, title } from './types';

export const ROWS = 1500;
export const COLUMNS = 7;

export const JOBS: Array<Job> = [
    { type: "coordinator", id: 0 },
    { type: "manager", id: 1 },
    { type: "engineer", id: 2 },
];

export const titleList: Array<title> = [
    { label: "name", componentType: "text" },
    { label: "country", componentType: "text" },
    { label: "phone number", componentType: "text" },
    { label: "updated", componentType: "date" },
    { label: "years of work", componentType: "number" },
    { label: "job type", options: JOBS, componentType: "enum" },
    { label: "contacted", componentType: "bool" },
];

export const LOCAL_STORAGE_STATE = "LOCAL_STORAGE_STATE";