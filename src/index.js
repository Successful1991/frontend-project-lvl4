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
import { I18nextProvider } from 'react-i18next';
import i18nInstance from './i18n.js';

const rootElement = document.getElementById('chat');

const rootReducer = combineReducers({
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

const init = async () => {
  const i18n = await i18nInstance();
  ReactDOM.render(<Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>, rootElement);
};

init();

