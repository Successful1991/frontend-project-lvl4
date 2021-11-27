import React, {useEffect} from 'react';
import axios from 'axios';
import routes from '../routes';
import { updateChannels, updateMessage, updateCurrentChannel } from '../reducers';
import Channels from './channels';
import Messages from './messages';
import { useDispatch } from 'react-redux';

const getHeader = () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
};

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.get(routes.channelsPath(), getHeader());
    const currentChannel = data.channels[data.currentChannelId];

    if (data.channels.length > 0) {
      dispatch(updateChannels(data.channels));
    }
    if (data.messages.length > 0) {
      dispatch(updateMessage(data.messages))
    }
    if(currentChannel) {
      dispatch(updateCurrentChannel(currentChannel));
    }
  }, []);

  return <div className='container d-flex'>
    <Channels />
    <Messages />
  </div>;
};

export default Chat;
