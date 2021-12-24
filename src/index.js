// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { channelsSlice, messagesSlice } from './slices/index.js';
import { Provider } from 'react-redux';
import './i18n.js';

const rootReducer = combineReducers({
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

const rootElement = document.getElementById('chat');

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, rootElement);
