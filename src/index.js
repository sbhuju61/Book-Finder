import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import BookSearch from './containers/BookSearch';
import { createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import bookSearch from "./store/reducers/bookSearch";
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(bookSearch, composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(<Provider store = {store} ><BookSearch /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
