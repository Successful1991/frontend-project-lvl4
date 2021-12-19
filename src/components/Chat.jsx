import React, {useEffect} from 'react';
import axios from 'axios';
import routes from '../routes';
import { setAll, removeAll } from '../slices';
import Channels from './Channels';
import Messages from './Messages';
import { useDispatch } from 'react-redux';

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
    dispatch(setAll(data));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(removeAll());
    }
  });

  return <div className='my-container d-flex col-8 mx-auto'>
    <Channels />
    <Messages />
  </div>;
};

export default Chat;
