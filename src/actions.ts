import { SET_QUERY_STORE, actionType, QSType } from './types';

export function setFiltersArray(filters: Array<QSType>): actionType {
    return {
        type: SET_QUERY_STORE,
        payload: filters,
    }
}