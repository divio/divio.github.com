import React from 'react';
import Root from './components/root';
// history has to be passed as a prop for hot reloading to work
import { history } from 'react-router/lib/HashHistory';

React.render(<Root history={history} />, document.getElementById('root'));
