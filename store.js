import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';


const reducer = combineReducers(reducers);
let middleWares = [thunkMiddleware];
if (__DEV__) {
    const createLogger = require('redux-logger');
    middleWares.push(createLogger());
}
let createStoreWithMiddleware = applyMiddleware(
    ...middleWares
)(createStore);


export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
