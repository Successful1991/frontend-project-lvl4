import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {channelsSlice, messagesSlice} from '../slices';
// import {addChannelAction, removeChannelAction, addMessageAction, renameChannelAction} from '../slices';
import { serviceContext } from '../contexts';
import React, {useEffect} from 'react';

function ServiceProvider({ children }) {
  const socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('newMessage', message => {
        dispatch(messagesSlice.actions.addMessage(message));
      });
      socket.on('newChannel', newChannel => {
        dispatch(channelsSlice.actions.addChannel(newChannel));
      });
      socket.on('renameChannel', newChannel => {
        dispatch(channelsSlice.actions.renameChannel(newChannel));
      });
      socket.on('removeChannel', removingChannel => {
        dispatch(channelsSlice.actions.removeChannel(removingChannel));
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }, []);


  const sendMessage = message => {
    return socket.emit('newMessage', message);
  };

  const createChannel = channel => {
    socket.emit('newChannel', channel);
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel);
  };

  const removeChannel = channel => {
    socket.emit('removeChannel', channel);
  };

  return <serviceContext.Provider value={{sendMessage, createChannel, renameChannel, removeChannel}}>{children}</serviceContext.Provider> ;
}

export default ServiceProvider;
