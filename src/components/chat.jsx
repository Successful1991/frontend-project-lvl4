import React, {useEffect} from 'react';
import axios from 'axios';
import routes from '../routes';
import { channelsSlice, messagesSlice } from '../slices';
import Channels from './channels';
import Messages from './messages';
import { useDispatch } from 'react-redux';
import { find } from 'lodash';

const getHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return {
      headers: {
        Authorization: `Bearer ${userId.token}`,
      }
    }
  }
  return {};
};

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.get(routes.channelsPath(), getHeader());
    // const currentChannel = find(data.channels, ['id', data.currentChannelId]);
    console.log(channelsSlice);
    dispatch(messagesSlice.actions.addMessage(data.messages));
    dispatch(channelsSlice.actions.addChannel(data.channels));
    dispatch(channelsSlice.actions.setCurrentChannelId(data.currentChannelId));

  }, []);

  return <div className='my-container d-flex'>
    <Channels />
    <Messages />
  </div>;
};

export default Chat;
