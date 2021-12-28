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
import ServiceProvider from './service.js';
import io from 'socket.io-client';

const rootElement = document.getElementById('chat');

const rootReducer = combineReducers({
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

const socket = io();

const init = async () => {
  const i18n = await i18nInstance();
  ReactDOM.render(<div>
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ServiceProvider socket={socket}>
        <App />
      </ServiceProvider>
    </I18nextProvider>
  </Provider>
  </div>, rootElement);
};

export default init;
