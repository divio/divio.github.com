import { FETCH_REPOS_SUCCESS, FETCH_MEMBERS_SUCCESS } from './actions';
import { assign } from 'lodash';

const STORE = 'store';

export const localStorageMiddleware = store => next => action => {
    let result = next(action);

    if (action.type === FETCH_REPOS_SUCCESS || action.type === FETCH_MEMBERS_SUCCESS) {
        try {
            localStorage.setItem(STORE, JSON.stringify(store.getState()));
        } catch (e) {}
    }

    return result;
}

export function rehydrateStateFromLocalStorage(initialState) {
    let persistedState = {}
    try {
        persistedState = JSON.parse(localStorage.getItem(STORE));
    } catch (e) {}
    return assign({}, persistedState, initialState);
}
