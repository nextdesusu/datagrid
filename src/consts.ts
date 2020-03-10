import { Job, title } from './types';

export const COLUMNS = 1500;

export const JOBS: Array<Job> = [
    { type: "coordinator", id: 0 },
    { type: "manager", id: 1 },
    { type: "engineer", id: 2 },
];

export const titleList: Array<title> = [
    { label: "name", value: "name", componentType: "text" },
    { label: "country", value: "country", componentType: "text" },
    { label: "phone number", value: "phone number", componentType: "text" },
    { label: "updated", value: "updated", componentType: "text" },
    { label: "years of expirience", value: "years of expirience", componentType: "text" },
    { label: "job type", options: JOBS, componentType: "enum" },
    { label: "contacted", options: [true, false], componentType: "boolean" },
];