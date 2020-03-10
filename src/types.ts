export interface Job {
    type: string;
    id: number;
}

export type QSType = string | boolean | number;

export const SET_QUERY_STORE = "SET_QUERY_STORE";

export interface filter {
    checked: boolean;
    value: string | boolean;
}

export interface QueryStore {
    filters: Array<QSType>;
}

interface setFiltersAction {
    type: typeof SET_QUERY_STORE;
    payload: Array<QSType>
}

export type actionType = setFiltersAction;

export interface option {
    label: string;
    value: number;
}

export interface title {
    label: string;
    componentType: string;
    value?: string | boolean;
    options?:  Array<any>;
}