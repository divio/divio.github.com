import {
    FETCH_REPOS,
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBERS_FAILURE
} from '../actions';
import { compact, pluck, pick, uniq, sortBy } from 'lodash';
import { combineReducers } from 'redux';

export function repos(state = [], action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
            return sortBy([...state, ...action.data], 'stargazers_count')
                .reverse()
                // make it smaller for smaller persistence layer
                .map(item => pick(item, [
                    'id',
                    'name',
                    'language',
                    'stargazers_count',
                    'forks_count',
                    'html_url',
                    'description'
                ]));
        default:
            return state;
    }
}

export function members(state = [], action) {
    switch (action.type) {
        case FETCH_MEMBERS_SUCCESS:
            return uniq([...state, ...action.data], 'login')
                .map(item => pick(item, 'login'));
        default:
            return state;
    }
}

export function lastFetched(state = 0, action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
        case FETCH_MEMBERS_SUCCESS:
            return Date.now();
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
            return compact(uniq([...state, ...pluck(action.data, 'language')]));
        default:
            return state;
    }
}

export default combineReducers({
    errorMessage,
    languages,
    lastFetched,
    repos,
    members
});
