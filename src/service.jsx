import React from 'react';
import { serviceContext } from './contexts/index.jsx';

function ServiceProvider({ socket, children }) {
  const sendMessage = (message, callback) => new Promise((resolve) => {
    socket.emit('newMessage', message, (response) => {
      callback(response);
      resolve();
    });
  });

  const createChannel = (channel, callback) => new Promise((resolve) => {
    socket.emit('newChannel', channel, (response) => {
      callback(response);
      resolve();
    });
  });

  const renameChannel = (channel, callback) => new Promise((resolve) => {
    socket.emit('renameChannel', channel, (response) => {
      callback(response);
      resolve();
    });
  });

  const removeChannel = (channel, callback) => new Promise((resolve) => {
    socket.emit('removeChannel', channel, (response) => {
      callback(response);
      resolve();
    });
  });

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
