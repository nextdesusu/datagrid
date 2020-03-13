export interface Job {
    type: string;
    id: number;
}

export interface option {
    label: string;
    value: number;
}

export interface title {
    label: string;
    componentType: string;
    options?:  Array<any>;
}

export type MouseEventHandler = (event: React.MouseEvent) => void;

export type dataValue = string | object | boolean | number;

export type filterValue = string | boolean | number | null;

export const SET_QUERY_STORE = "SET_QUERY_STORE";
export const CHANGE_FILTER_BY_ID = "CHANGE_FILTER_BY_ID";

export interface Filter {
    switchedOn: boolean;
    type: string;
    id: number;
    value: filterValue;
}

export interface FilterWithId {
    id: number;
    value: Filter;
}

export interface QueryStore {
    filters: Array<Filter>;
    sorters: Array<Boolean>;
    sortPredicate: boolean;
}

interface changeFilterAction {
    type: typeof CHANGE_FILTER_BY_ID;
    payload: FilterWithId;
}

interface setFiltersAction {
    type: typeof SET_QUERY_STORE;
    payload: Array<Filter>
}

export type actionType = setFiltersAction | changeFilterAction;