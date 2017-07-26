import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import IndexScene from './index/index.js';

render(
    <IndexScene> </IndexScene>,
    document.getElementById('root')
);
