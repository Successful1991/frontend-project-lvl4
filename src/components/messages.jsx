import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import { find } from 'lodash';
import {Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {authContext, serviceContext} from '../contexts';

const getCurrentChannel = () => {
  const { channels, currentChannelId } = useSelector(state => state.channelsInfo);
  if (!channels.length || !currentChannelId) return '';
  return find(channels, channel => channel.id === currentChannelId).name;
};

const Messages = () => {
  const { sendMessage } = useContext(serviceContext);
  const { user } = useContext(authContext);
  const { messages } = useSelector(state => state.messagesInfo);
  const { currentChannelId } = useSelector(state => state.channelsInfo);
  const [showMessages, setShowMessage] = useState('');
  const channelName = useCallback(getCurrentChannel, [currentChannelId]);

  useEffect(() => {
    const currentMessages = messages.filter(message => message.channelId === currentChannelId)
      .map(message => <li className='message' key={message.id}>
        <span className="message__user">{message.user}</span>
        :
        <span className="message__text">{message.message}</span>
      </li>);

    const newMessages = currentMessages.length ? currentMessages : '';
    setShowMessage(newMessages);
  }, [messages, currentChannelId]);

  return <div className='main'>
    <div className='chat'>
      <div className='chat__head'>
        <div className='chat__title'># {channelName()}</div>
        <div className='chat__desc'>{showMessages.length} сообщений</div>
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
          onSubmit={(values, actions) => {
            try {
              sendMessage({ ...values, channelId: currentChannelId, user: user.username });
              actions.resetForm({
                message: ''
              })
            } catch (e) {
              throw new Error('Failed send message');
            }
          }}
        >
          {({
              handleSubmit,
              values,
              handleChange,
            }) => (
            <Form onSubmit={handleSubmit} className='form'>
              <Form.Control
                type='text'
                name='message'
                value={values.message}
                placeholder='message'
                onChange={handleChange}
                className='form__input'
              />
              <div className='form__btn'>
                <button type='submit' className='btn btn-group-vertical' disabled={!values.message} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                  </svg>
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
