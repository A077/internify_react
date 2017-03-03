import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { store } from 'store';
import { Routes } from './routes';

ReactDOM.render(
  <Provider store={store}>
    {Routes}
  </Provider>,
  document.getElementById('root')
);