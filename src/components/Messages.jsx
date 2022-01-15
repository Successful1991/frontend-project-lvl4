import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Form, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { authContext, serviceContext } from '../contexts';
import {useTranslation} from 'react-i18next';
const filter = require('leo-profanity');

const getCurrentChannel = () => {
  const { entities, currentChannelId } = useSelector(state => state.channels);
  return entities[currentChannelId]?.name ?? null;
};

const Messages = () => {
  const { t } = useTranslation();
  const { sendMessageService } = useContext(serviceContext);
  const { user } = useContext(authContext);

  const { entities, ids } = useSelector(state => state.messages);
  const { currentChannelId } = useSelector(state => state.channels);
  const [showMessages, setShowMessage] = useState('');
  const channelName = useCallback(getCurrentChannel, [currentChannelId]);

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  useEffect(() => {
    const currentMessages = ids.filter(id => entities[id].channelId === currentChannelId)
      .map(id => <li className='message' key={id}>
          <span className="message__user">{entities[id].user}</span>
          :
          <span className="message__text">{entities[id].message}</span>
        </li>);

    const newMessages = currentMessages.length ? currentMessages : '';
    setShowMessage(newMessages);

  }, [ids, currentChannelId]);

  return <div className='main'>
    <div className='chat'>
      <div className='chat__head'>
        <div className='chat__title'># {channelName()}</div>
        <div className='chat__desc'>{showMessages.length} { t('messages.count', { count: showMessages.length })}</div>
      </div>
      <div className='chat__body'>
        <div className='chat__messages'>
          <ul className='messages'>
            {showMessages}
          </ul>
        </div>
      </div>
      <div className='chat__form'>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const updatedMessage = filter.clean(values.message);
            const newMessage = {
              message: updatedMessage,
              channelId: currentChannelId,
              user: user.username
            };
            console.log('newMessage', newMessage);
            sendMessageService(newMessage, () => {
              resetForm();
              setSubmitting(false);
            });
          }}
        >
          {({
              handleSubmit,
              values,
              handleChange,
              isSubmitting
            }) => (
            <Form onSubmit={handleSubmit} className='form'>
              <Form.Control
                type='text'
                name='message'
                value={values.message}
                placeholder={t('messages.placeholder')}
                onChange={handleChange}
                aria-label='Новое сообщение'
                className='form__input'
              />
              <div className='input-group-append form__btn'>
                <button type="submit"
                        role="button"
                        className='btn btn-group-vertical'
                        disabled={!values.message || isSubmitting}
                        name="Отправить"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                  </svg>
                  <span className="visually-hidden">Отправить</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>;
};

export default Messages;
