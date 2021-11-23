// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './reducers/index.js';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('chat');

const rootReducer = combineReducers({
  channels: channelsReducer,
});

const store = configureStore({
  reducer: rootReducer
});


ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, rootElement);
