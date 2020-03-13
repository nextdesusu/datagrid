import { LOCAL_STORAGE_STATE } from "./consts";
import { QueryStore, Filter } from './types';

const LSsave = (state: QueryStore): void => {
    const stringifyedState: string = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_STATE, stringifyedState);
}

const LSload = (): Array<Filter> => {
    const stringifyedState: string | null = localStorage.getItem(LOCAL_STORAGE_STATE);
    const parsed: QueryStore = JSON.parse(stringifyedState as string);
    const filters: Array<Filter> = parsed?.filters || [];
    return filters;
}

export { LSsave, LSload };