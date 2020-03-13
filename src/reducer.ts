import { SET_QUERY_STORE, CHANGE_FILTER_BY_ID, QueryStore, actionType } from './types';

const initialState: QueryStore = {
    filters: [],
    sorters: [],
    sortPredicate: false,
}

export default function reducer(state: QueryStore = initialState, action: actionType) {
    switch (action.type) {
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
        default:
            return state;
    }
}