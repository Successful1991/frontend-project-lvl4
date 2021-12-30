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
          onSubmit={({ message }, actions) => {
            try {
              const updatedMessage = filter.clean(message);
              sendMessageService({ message: updatedMessage, channelId: currentChannelId, user: user.username });
              actions.resetForm({
                message: ''
              })
            } catch (e) {
              throw new Error(t('errors.failed send message'));
            }
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
                className='form__input'
              />
              <div className='input-group-append form__btn'>
                <button type="submit"
                        role="button"
                        aria-roledescription="button"
                        className='btn btn-group-vertical'
                        disabled={!values.message || isSubmitting}
                        aria-label='Новое сообщение'
                        name="Отправить"
                ><span className="visually-hidden" >Отправить</span>
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
