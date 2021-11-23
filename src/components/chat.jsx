import React, {useEffect, useState} from 'react';
import axios from 'axios';
import routes from '../routes';
import { channels_update } from '../reducers';
import { useDispatch } from 'react-redux';

const getHeader = () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  console.log(token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
};


const Chat = () => {
  const [pageContent, setPageContent] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.get(routes.channelsPath(), getHeader());

    dispatch(channels_update(data.channels));
    setPageContent(JSON.stringify(data.channels))
  }, []);

  return pageContent &&  <div>{pageContent}</div>;
};

export default Chat;
