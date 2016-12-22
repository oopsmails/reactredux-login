import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import routes from './routes';

// import App from './components/App';

// const store = createStore(
//   (state = {}) => state,
//   applyMiddleware(thunk)
// );

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// render(<App />, document.getElementById('app'));
// render(<Router history = {browserHistory} routes={routes} />, document.getElementById('app'));

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));

