import {
    SET_QUERY_STORE,
    CHANGE_FILTER_BY_ID,
    SET_SORTERS,
    SET_STORE,
    SET_SORT_PRED
} from "./consts";

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
    options?: Array<any>;
}

export type MouseEventHandler = (event: React.MouseEvent) => void;

export type dataValue = string | object | boolean | number;

export type sortersArray = Array<number>;

export type filterValue = string | boolean | number | null;

export interface setSortersAction {
    type: typeof SET_SORTERS;
    payload: sortersArray;
}

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
    sorters: sortersArray;
    sortPredicate: boolean;
}

export interface setSortPredicateAction {
    type: typeof SET_SORT_PRED;
    payload: boolean;
}

export interface setStoreAction {
    type: typeof SET_STORE;
    payload: QueryStore | null;
}

interface changeFilterAction {
    type: typeof CHANGE_FILTER_BY_ID;
    payload: FilterWithId;
}

interface setFiltersAction {
    type: typeof SET_QUERY_STORE;
    payload: Array<Filter>
}

export interface loadedStore {
    succes: boolean;
    store: QueryStore | null;
}

export type actionType = setFiltersAction |
    changeFilterAction |
    setSortersAction |
    setStoreAction |
    setSortPredicateAction;