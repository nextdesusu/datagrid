import { Job } from './types';

export const COLUMNS = 1500;

export const JOBS: Array<Job> = [
    {type: "coordinator", id: 0},
    {type: "manager", id: 1},
    {type: "engineer", id: 2},
];

export const titleList: Array<string> = [
    "name",
    "country",
    "phone number",
    "updated",
    "years of expirience",
    "job type",
    "contacted"
];