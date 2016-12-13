import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

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

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));

