import { SET_QUERY_STORE, QueryStore, actionType } from './types';

const initialState: QueryStore = {
    filters: [],
}

export default function reducer(state: QueryStore = initialState, action: actionType){
    switch(action.type) {
        case SET_QUERY_STORE:
            return { filters: action.payload }
        default:
            return state;
    }
}