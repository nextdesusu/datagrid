import { actionType, Filter, sortersArray } from './types';
import { SET_QUERY_STORE, CHANGE_FILTER_BY_ID, SET_SORTERS } from "./consts";

export function setFiltersArray(filters: Array<Filter>): actionType {
    return {
        type: SET_QUERY_STORE,
        payload: filters,
    }
}

export function changeFilterById(id: number, filter: Filter): actionType {
    return {
        type: CHANGE_FILTER_BY_ID,
        payload: {id, value: filter},
    }
}

export function setSortersArray(sorters: sortersArray): actionType {
    return {
        type: SET_SORTERS,
        payload: sorters,
    }
}