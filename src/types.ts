type filterType = string | boolean;
export const SET_FILTER = "SET_FILTER";
export const INIT_STORE = "INIT_STORE";

export interface filter {
    index: number;
    value: filterType;
}

export interface filterAction {
    type: typeof SET_FILTER;
    payload: filter;
}

export interface initAction {
    type: typeof INIT_STORE;
    payload: number;
}

export interface QueryStore {
    filters: Array<filterType>;
}

export type actionType = filterAction | initAction;