import React from 'react';
import { serviceContext } from './contexts/index.jsx';

const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  try {
    fn(...args);
    resolve();
  } catch (e) {
    reject();
  }
});

function ServiceProvider({ socket, children }) {
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
