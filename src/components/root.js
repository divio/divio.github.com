import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { includes } from 'lodash';
import configureStore from '../store';
import App from './app';
import Header from './header';
import Footer from './footer';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <div>
                <Header />
                <Provider store={store}>
                    {() =>
                        // has to be wrapped in a func, limitation of react@0.13.3
                        <Router history={this.props.history}>
                            <Route path="/(:lang)" component={App} />
                        </Router>
                    }
                </Provider>
                <Footer />
            </div>
        );
    }
}
