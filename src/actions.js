import fetch from 'isomorphic-fetch';
import { VERSION, INVALIDATE_TIME } from './config';

export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export const FETCH_MEMBERS = 'FETCH_MEMBERS';
export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';
export const FETCH_MEMBERS_FAILURE = 'FETCH_MEMBERS_FAILURE';
export const SET_VERSION = 'SET_VERSION';

export function requestRepos(orgName) {
    return {
        type: FETCH_REPOS,
        orgName
    }
}

export function receiveRepos(orgName, data) {
    return {
        type: FETCH_REPOS_SUCCESS,
        orgName,
        data
    }
}

export function requestMembers(orgName) {
    return {
        type: FETCH_MEMBERS,
        orgName
    }
}

export function receiveMembers(orgName, data) {
    return {
        type: FETCH_MEMBERS_SUCCESS,
        orgName,
        data
    }
}

export function failRepos(orgName, data) {
    return {
        type: FETCH_REPOS_FAILURE,
        orgName,
        data
    }
}
export function failMembers(orgName, data) {
    return {
        type: FETCH_MEMBERS_FAILURE,
        orgName,
        data
    }
}
export function setVersion(version) {
    return {
        type: SET_VERSION,
        version
    }
}

export function initApp(orgNames) {
    return (dispatch, getState) => {
        var state = getState();
        var currentTime = Date.now();

        if (VERSION === state.version &&
            state.repos.length &&
            state.members &&
            currentTime - state.lastFetched < INVALIDATE_TIME) {
            return;
        }

        dispatch(setVersion(VERSION));

        orgNames.forEach((orgName) => {
            dispatch(requestRepos(orgName));
            fetch(`https://api.github.com/orgs/${orgName}/repos?per_page=999&type=source`)
                .then(response => response.json().then(json => ({ json, response })))
                .then(({ json, response }) =>
                    response.ok ?
                        dispatch(receiveRepos(orgName, json)) :
                        dispatch(failRepos(orgName, json))
                ).catch(() => dispatch(failRepos(orgName, {
                    message: `Something is wrong with connection`
                })));

            dispatch(requestMembers(orgName));
            fetch(`https://api.github.com/orgs/${orgName}/members?per_page=999`)
                .then(response => response.json().then(json => ({ json, response })))
                .then(({ json, response }) =>
                    response.ok ?
                        dispatch(receiveMembers(orgName, json)) :
                        dispatch(failMembers(orgName, json))
                ).catch(() => dispatch(failRepos(orgName, {
                    message: `Something is wrong with connection`
                })));
        });
    }
}
