import { SET_FILTER, INIT_STORE, actionType, filter } from './types';

export function initStore(size: number): actionType {
    return {
        type: INIT_STORE,
        payload: size,
    }
}

export function setNewFilter(newFilter: filter): actionType {
    return {
        type: SET_FILTER,
        payload: newFilter,
    }
}