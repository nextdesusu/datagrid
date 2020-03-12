import { SET_QUERY_STORE, CHANGE_FILTER_BY_ID, actionType, Filter } from './types';

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