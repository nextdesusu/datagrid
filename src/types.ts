import {
    SET_QUERY_STORE,
    CHANGE_FILTER_BY_ID,
    SET_SORTERS,
    SET_STORE,
    SET_SORT_PRED,
    TOGGLE_SELECTED,
    UNSELECT_ALL
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

export type filterValue = string | boolean | Array<number> | number | null;

type selectedObject = { [key: number]: boolean };

export interface setSortersAction {
    type: typeof SET_SORTERS;
    payload: sortersArray;
}

export interface Filter {
    switchedOn: boolean;
    type: string;
    id: number;
    value: filterValue;
    enumValues?: Array<boolean>;
}

export interface FilterWithId {
    id: number;
    value: Filter;
}

export interface QueryStore {
    filters: Array<Filter>;
    sorters: sortersArray;
    sortPredicate: boolean;
    selected: selectedObject;
}

export interface setSortPredicateAction {
    type: typeof SET_SORT_PRED;
    payload: boolean;
}

export interface setStoreAction {
    type: typeof SET_STORE;
    payload: QueryStore | null;
}

export interface toggleSelected {
    type: typeof TOGGLE_SELECTED;
    payload: number;
}

export interface unselectAll {
    type: typeof UNSELECT_ALL;
    payload: null;
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
    setSortPredicateAction |
    toggleSelected |
    unselectAll;