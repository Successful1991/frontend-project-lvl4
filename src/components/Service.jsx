import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel, updateChannel, removeChannel, addMessage, setCurrentChannelId} from '../slices';
import { serviceContext } from '../contexts';
import React, {useEffect} from 'react';

function ServiceProvider({ children }) {
  const socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('newMessage', message => {
        dispatch(addMessage(message));
      });
      socket.on('newChannel', newChannel => {
        dispatch(addChannel(newChannel));
      });
      socket.on('renameChannel', newChannel => {
        dispatch(updateChannel({ id: newChannel.id, changes: newChannel }));
      });
      socket.on('removeChannel', removingChannel => {
        console.log(removingChannel);
        dispatch(removeChannel(removingChannel.id));
      });
    });

    return () => {
      socket.disconnect();
    }
  }, []);


  const sendMessageService = message => {
    return socket.emit('newMessage', message);
  };

  const createChannelService = channel => {
    socket.emit('newChannel', channel, updated => {
      if (updated.status !== 'ok') return;
      dispatch(setCurrentChannelId(updated.data.id))
    });
  };

  const renameChannelService = (channel) => {
    socket.emit('renameChannel', channel);
  };

  const removeChannelService = channel => {
    socket.emit('removeChannel', channel);
  };

  return <serviceContext.Provider value={{sendMessageService, createChannelService, renameChannelService, removeChannelService}}>{children}</serviceContext.Provider> ;
}

export default ServiceProvider;
