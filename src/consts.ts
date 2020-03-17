import { Job, title } from './types';

export const ROWS = 1100;
export const COLUMNS = 7;

export const SET_QUERY_STORE = "SET_QUERY_STORE";
export const CHANGE_FILTER_BY_ID = "CHANGE_FILTER_BY_ID";
export const SET_SORTERS = "SET_SORTERS";
export const SET_STORE = "SET_STORE";
export const SET_SORT_PRED = "SET_SORT_PRED";
export const TOGGLE_SELECTED = "TOGGLE_SELECTED";
export const UNSELECT_ALL = "UNSELECT_ALL";

export const JOBS: Array<Job> = [
    { type: "coordinator", id: 0 },
    { type: "manager", id: 1 },
    { type: "engineer", id: 2 },
];

export const titleList: Array<title> = [
    { label: "id", componentType: "number" },
    { label: "name", componentType: "text" },
    { label: "country", componentType: "text" },
    { label: "phone number", componentType: "text" },
    { label: "updated", componentType: "date" },
    { label: "job type", options: JOBS, componentType: "enum" },
    { label: "contacted", componentType: "bool" },
];

export const LOCAL_STORAGE_STATE = "LOCAL_STORAGE_STATE";