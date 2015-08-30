import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { localStorageMiddleware, rehydrateStateFromLocalStorage } from './middlewares';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
let middleWares = [thunkMiddleware, localStorageMiddleware];
if (__DEV__) {
    const createLogger = require('redux-logger');
    middleWares.push(createLogger());
}
let createStoreWithMiddleware = applyMiddleware(
    ...middleWares
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, rehydrateStateFromLocalStorage(initialState));
}
