import { QueryStore, actionType } from './types';
import { SET_QUERY_STORE, CHANGE_FILTER_BY_ID, SET_SORTERS, SET_STORE, SET_SORT_PRED, } from "./consts";


const initialState: QueryStore = {
    filters: [],
    sorters: [],
    sortPredicate: false,
}

export default function reducer(state: QueryStore = initialState, action: actionType) {
    switch (action.type) {
        case SET_STORE:
            return { ...state, ...action.payload };
        case SET_QUERY_STORE:
            return { ...state, filters: action.payload };
        case CHANGE_FILTER_BY_ID:
            return {
                ...state,
                filters: state.filters.map((filterItem, filterIndex) => {
                    const { id, value } = action.payload;
                    if (filterIndex === id) return value;
                    return filterItem;
                })
            };
        case SET_SORTERS:
            return { ...state, sorters: action.payload };
        case SET_SORT_PRED:
            return { ...state, sortPredicate: action.payload };
        default:
            return state;
    }
}