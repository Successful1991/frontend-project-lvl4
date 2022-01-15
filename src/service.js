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

  const createChannelService = channel => {
    socket.emit('newChannel', channel, updated => {
      if (updated.status !== 'ok') return;
      dispatch(setCurrentChannelId(updated.data.id));
    });
  };

  const renameChannelService = channel => {
    socket.emit('renameChannel', channel, updated => {
      if (updated.status !== 'ok') return;
      toast.success(t('toast.rename channel'), {
        progressClassName: 'success',
        pauseOnHover: false
      });
    });
  };

  const removeChannelService = channel => {
    socket.emit('removeChannel', channel);
  };

  return <serviceContext.Provider value={{
    sendMessageService,
    createChannelService,
    renameChannelService,
    removeChannelService
  }}>{children}</serviceContext.Provider>;
}

export default ServiceProvider;

