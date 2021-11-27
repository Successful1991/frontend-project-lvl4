import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '../reducers';
import { serviceContext } from '../contexts';
import React, {useEffect} from 'react';

function ServiceProvider({ children }) {
  const socket = io();
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.chat);

  socket.on('connect', () => {
    socket.on('newMessage', message => {
      dispatch(updateMessage([...messages, message]));
    })
  });

  const sendMessage = message => {
    return socket.emit('newMessage', message);
  };

  return <serviceContext.Provider value={{sendMessage}}>{children}</serviceContext.Provider> ;
}

export default ServiceProvider;
