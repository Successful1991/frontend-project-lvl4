import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { setAll, removeAll } from '../store/channel-slice.js';
import Channels from './Channels';
import Messages from './Messages';

import useAuth from '../hooks';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(routes.channelsPath(), auth.getHeader(auth));
      setLoading(false);
      dispatch(setAll(data));
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        auth.logOut();
        navigate('/');
      }
      const keyErrorText = err.isAxiosError ? t('errors.network') : err.message;
      toast.error(keyErrorText, {
        progressClassName: 'error',
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => () => {
    dispatch(removeAll());
  }, []);

  return (
    <div className="my-container d-flex col-8 mx-auto">
      {
        isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <Channels />
            <Messages />
          </>
        )
      }
    </div>
  );
};

export default Chat;
