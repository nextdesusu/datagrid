import { LOCAL_STORAGE_STATE } from "./consts";
import { QueryStore, loadedStore } from './types';

const LSsave = (state: QueryStore): void => {
    const stringifyedState: string = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_STATE, stringifyedState);
}

const LSload = (): loadedStore => {
    const stringifyedState: string | null = localStorage.getItem(LOCAL_STORAGE_STATE);
    if (stringifyedState === null) {
        return {
            succes: false,
            store: null,
        };
    }
    const store: QueryStore = JSON.parse(stringifyedState as string);
    return {
        succes: true,
        store, 
    }
}

export { LSsave, LSload };