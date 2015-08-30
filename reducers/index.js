import {
    FETCH_REPOS,
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBERS_FAILURE
} from '../actions';
import { compact, pluck, uniq, sortBy } from 'lodash';

export function repos(state = [], action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
            return sortBy(action.data, 'stargazers_count').reverse();
        default:
            return state;
    }
}

export function members(state = [], action) {
    switch (action.type) {
        case FETCH_MEMBERS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

export function errorMessage(state = '', action) {
    switch (action.type) {
        case FETCH_MEMBERS_FAILURE:
        case FETCH_REPOS_FAILURE:
            return action.data.message;
        case FETCH_REPOS_SUCCESS:
        case FETCH_MEMBERS_SUCCESS:
            return '';
        default:
            return state;
    }
}

export function languages(state = [], action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
            return compact(uniq(pluck(action.data, 'language')));
        default:
            return state;
    }
}
