import React from 'react';
import { useTranslation } from 'react-i18next';
import { serviceContext } from './contexts/index.jsx';

const CONNECTION_TIMEOUT = 6000;

function ServiceProvider({ socket, children }) {
  const { t } = useTranslation();
  const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error(t('errors.network')));
    }, CONNECTION_TIMEOUT);

    fn(...args, ({ data, status }) => {
      clearTimeout(timerId);
      if (status === 'ok') resolve(data);
      reject(new Error(t('errors.server')));
    });
  });

  const sendMessage = promisify((...payload) => socket.emit('newMessage', ...payload));
  const createChannel = promisify((...payload) => socket.emit('newChannel', ...payload));
  const renameChannel = promisify((...payload) => socket.emit('renameChannel', ...payload));
  const removeChannel = promisify((...payload) => socket.emit('removeChannel', ...payload));

  return (
    <serviceContext.Provider value={{
      sendMessage,
      createChannel,
      renameChannel,
      removeChannel,
    }}
    >
      {children}
    </serviceContext.Provider>
  );
}

export default ServiceProvider;
