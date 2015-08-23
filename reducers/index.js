import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions';
import { compact, pluck, uniq, sortBy } from 'lodash';

export function repos(state = [], action) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return sortBy(action.data, 'stargazers_count').reverse();
        default:
            return state;
    }
}

export function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_DATA:
            return true;
        case FETCH_DATA_SUCCESS:
        case FETCH_DATA_FAILURE:
        default:
            return false;
    }
}

export function languages(state = [], action) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return compact(uniq(pluck(action.data, 'language')));
        default:
            return state;
    }
}
