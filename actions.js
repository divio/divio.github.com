import fetch from 'isomorphic-fetch';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export function requestData(orgName) {
    return {
        type: FETCH_DATA,
        orgName
    }
}

export function receiveData(orgName, data) {
    return {
        type: FETCH_DATA_SUCCESS,
        orgName,
        data
    }
}

export function initApp(orgName) {
    return (dispatch) => {
        dispatch(requestData(orgName));
        return fetch(`https://api.github.com/orgs/${orgName}/repos?per_page=999&type=sources`)
            .then(req => req.json())
            .then(json => dispatch(receiveData(orgName, json)));
    }
}
