import { actionType, Filter, sortersArray, QueryStore } from './types';
import { SET_QUERY_STORE, CHANGE_FILTER_BY_ID, SET_SORTERS, SET_STORE, SET_SORT_PRED, TOGGLE_SELECTED, UNSELECT_ALL } from "./consts";

export function setFiltersArray(filters: Array<Filter>): actionType {
    return {
        type: SET_QUERY_STORE,
        payload: filters,
    }
}

export function changeFilterById(id: number, filter: Filter): actionType {
    return {
        type: CHANGE_FILTER_BY_ID,
        payload: { id, value: filter },
    }
}

export function setSortersArray(sorters: sortersArray): actionType {
    return {
        type: SET_SORTERS,
        payload: sorters,
    }
}

export function setQuyeryStore(store: QueryStore | null): actionType {
    if (store === null) throw Error("Store is null!");
    return {
        type: SET_STORE,
        payload: store,
    }
}

export function setSortPredicate(pred: boolean): actionType {
    return {
        type: SET_SORT_PRED,
        payload: pred,
    }
}

export function toggleSelectedAction(id: number): actionType {
    return {
        type: TOGGLE_SELECTED,
        payload: id,
    }
}

export function unselectAllAction(): actionType {
    return {
        type: UNSELECT_ALL,
        payload: null,
    }
}