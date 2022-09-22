import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import store from './redux/store';
import { Provider } from 'react-redux';
// STORE

// ACTION



const app = document.getElementById("root")
if (app) {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    app);
}








