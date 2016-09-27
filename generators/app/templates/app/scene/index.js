import React from 'react';
import { render } from 'react-dom';
import { Router,Route,  browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../Component/App.js';

render(
  <App></App>,
  document.getElementById('app')
);

