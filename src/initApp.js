import React from 'react';
import {
  Provider,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import { Provider as RolbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './styles/application.scss';
import { filterTextContext } from './contexts/index.jsx';
import i18nInstance from './i18n.js';
import ServiceProvider from './service.jsx';
import { messagesSlice, addMessage } from './store/message-slice.js';
import { modalSlice } from './store/modal-slice.js';
import {
  channelsSlice,
  addChannel,
  updateChannel,
  removeChannel,
} from './store/channel-slice.js';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const init = async (socket, filter) => {
  const i18n = await i18nInstance();
  const rollbarConfig = {
    accessToken: process.env.TOKEN_ACCESS_ROLLBAR,
    environment: process.env.NODE_ENV,
  };

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
          <RolbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <filterTextContext.Provider value={{ filter }}>
                <App />
              </filterTextContext.Provider>
            </ErrorBoundary>
          </RolbarProvider>
        </ServiceProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
