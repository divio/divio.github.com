import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

if (__DEV__) {
    const createLogger = require('redux-logger');
    createStoreWithMiddleware = applyMiddleware(createLogger())(createStoreWithMiddleware);
}

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
