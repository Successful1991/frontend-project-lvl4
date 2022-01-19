import React from 'react';
import {
  Provider,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import App from './components/App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import i18nInstance from './i18n.js';
import ServiceProvider from './service.jsx';
import {
  channelsSlice,
  messagesSlice,
  addChannel,
  updateChannel,
  removeChannel,
  addMessage,
} from './slices/index.js';
import Rollbar from './components/rollbar.jsx';

const rootReducer = combineReducers({
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const init = async (socket) => {
  const i18n = await i18nInstance();

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(addChannel(newChannel));
  });
  socket.on('renameChannel', (newChannel) => {
    store.dispatch(updateChannel({ id: newChannel.id, changes: newChannel }));
  });
  socket.on('removeChannel', (removingChannel) => {
    store.dispatch(removeChannel(removingChannel.id));
  });

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ServiceProvider socket={socket}>
          <Rollbar>
            <App />
          </Rollbar>
        </ServiceProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
