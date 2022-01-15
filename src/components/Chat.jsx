import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import routes from '../routes';
import { setAll, removeAll } from '../slices';
import Channels from './Channels';
import Messages from './Messages';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {useTranslation} from 'react-i18next';
import useAuth from '../hooks';

import {getModal} from './modal';
import {serviceContext} from '../contexts';


const renderModal = ({ modalInfo, hideModal, setChannel}) => {
  if (!modalInfo.type) return null;

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} hideModal={hideModal} setChannel={setChannel} />;
};

const getHeader = auth => {
  const userId = auth.user;

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
  const { t } = useTranslation();
  const auth = useAuth();

  const { createChannelService, renameChannelService, removeChannelService } = useContext(serviceContext);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });


  const mappingChannel = {
    adding: createChannelService,
    renaming: renameChannelService,
    removing: removeChannelService,
  };

  const setChannel = ({type, item}, callback) => {
    mappingChannel[type] && mappingChannel[type](item, callback);
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get(routes.channelsPath(), getHeader(auth));
      dispatch(setAll(data));
    } catch (e) {
      const keyErrorText = e.isAxiosError ? t('toast.failed request'): e.message;
      toast.error(keyErrorText, {
        progressClassName: 'error',
        pauseOnHover: false
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(removeAll());
    }
  }, []);

  return <>
    <div
      className='my-container d-flex col-8 mx-auto'
      aria-hidden={Boolean(modalInfo.type)}
    >
      <Channels showModal={showModal}/>
      <Messages />
    </div>
  <ToastContainer draggable={false}/>
  {renderModal({ modalInfo, hideModal, setChannel })}
  </>;
};

export default Chat;
