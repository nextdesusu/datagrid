import { SET_FILTER, INIT_STORE, QueryStore, actionType } from './types';

const initialState: QueryStore = {
    filters: [],
}

export default function reducer(state: QueryStore = initialState, action: actionType){
    switch(action.type) {
        case SET_FILTER:
            const { index, value } = action.payload;
            const newFilters = [...state.filters];
            newFilters[index] = value;
            return { filters: newFilters }
        case INIT_STORE:
            const initial: Array<string | boolean> = new Array(action.payload);
            return { filters: initial }
        default:
            return state;
    }
}