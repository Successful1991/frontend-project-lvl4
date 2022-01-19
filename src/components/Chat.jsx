import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { setAll, removeAll } from '../slices';
import Channels from './Channels';
import Messages from './Messages';

import useAuth from '../hooks';
import getModal from './modal';
import { serviceContext } from '../contexts';

const renderModal = ({ modalInfo, hideModal, setChannel }) => {
  if (!modalInfo.type) return null;

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} hideModal={hideModal} setChannel={setChannel} />;
};

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();

  const {
    createChannel,
    renameChannel,
    removeChannel,
  } = useContext(serviceContext);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const mappingChannel = {
    adding: createChannel,
    renaming: renameChannel,
    removing: removeChannel,
  };

  const setChannel = ({ type, item }, callback) => {
    if (mappingChannel[type]) mappingChannel[type](item, callback);
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get(routes.channelsPath(), auth.getHeader(auth));
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
  }, []);

  useEffect(() => () => {
    dispatch(removeAll());
  }, []);

  return (
    <>
      <div
        className="my-container d-flex col-8 mx-auto"
        aria-hidden={Boolean(modalInfo.type)}
      >
        <Channels showModal={showModal} />
        <Messages />
      </div>
      {renderModal({ modalInfo, hideModal, setChannel })}
    </>
  );
};

export default Chat;
