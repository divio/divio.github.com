import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { includes } from 'lodash';
import configureStore from '../store';
import App from './app';

const store = configureStore();
const redirectFromWrongLanguage = (nextState, transition) => {
    const languages = store.getState().languages;
    if (!includes(languages, nextState.params.lang) && nextState.params.lang) {
        transition.to('/');
    }
};

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                {() =>
                    // has to be wrapped in a func, limitation of react@0.13.3
                    <Router history={this.props.history}>
                        <Route path="/(:lang)" component={App}
                            onEnter={redirectFromWrongLanguage} />
                    </Router>
                }
            </Provider>
        );
    }
}
