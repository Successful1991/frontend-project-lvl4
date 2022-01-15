import {useDispatch} from 'react-redux';
import {
  addChannel,
  updateChannel,
  removeChannel,
  addMessage,
  setCurrentChannelId
} from './slices/index.js';
import {serviceContext} from './contexts/index.jsx';
import React from 'react';
import {toast} from 'react-toastify';

function ServiceProvider({socket, children}) {
  const dispatch = useDispatch();

  socket.on('newMessage', message => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', newChannel => {
    dispatch(addChannel(newChannel));
  });
  socket.on('renameChannel', newChannel => {
    dispatch(updateChannel({id: newChannel.id, changes: newChannel}));
  });
  socket.on('removeChannel', removingChannel => {
    dispatch(removeChannel(removingChannel.id));
  });

  const sendMessageService = (message, callback) => {
    socket.emit('newMessage', message, callback);
  };

  const createChannelService = (channel, callback) => {
    socket.emit('newChannel', channel, response => {
      if (response.status !== 'ok') return;
      callback(response.data.id);
      // dispatch(setCurrentChannelId(updated.data.id));
    });
  };

  const renameChannelService = (channel, callback) => {
    socket.emit('renameChannel', channel, response => {
      if (response.status !== 'ok') return;
      callback()
    });
  };

  const removeChannelService = (channel, callback) => {
    socket.emit('removeChannel', channel, response => {
      if (response.status !== 'ok') return;
      callback()
    });
  };

  return <serviceContext.Provider value={{
    sendMessageService,
    createChannelService,
    renameChannelService,
    removeChannelService
  }}>{children}</serviceContext.Provider>;
}

export default ServiceProvider;

