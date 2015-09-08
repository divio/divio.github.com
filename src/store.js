import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { localStorageMiddleware, rehydrateStateFromLocalStorage } from './middlewares';
import rootReducer from './reducers';

let middleWares = [thunkMiddleware, localStorageMiddleware];
if (__DEV__) {
    const createLogger = require('redux-logger');
    middleWares.push(createLogger());
}
let createStoreWithMiddleware = applyMiddleware(
    ...middleWares
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, rehydrateStateFromLocalStorage(initialState));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
