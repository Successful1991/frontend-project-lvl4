import React, {useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { serviceContext } from '../contexts';

const Messages = () => {
  const { sendMessage } = useContext(serviceContext);
  const { messages, currentChannel} = useSelector(state => state.chat);
  const [messagesList, setMessageList] = useState('');

  useEffect(() => {
    const list = messages.length
      ? messages.map(message => <li className='channel' key={message.id}>{message.message}</li>)
      : '';
    setMessageList(list);
  }, [messages]);

  return <div className='main'>
    <div className='chat'>
      <div className='chat__head'>
        <div className='chat__title'># {currentChannel && currentChannel.name}</div>
        <div className='chat__desc'>{messages.length} сообщений</div>
      </div>
      <div className='chat__body'>
        <div className='chat__messages'>
          <ul className='messages'>
            {messagesList}
          </ul>
        </div>
      </div>
      <div className='chat__form'>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={(values, actions) => {
            try {
              sendMessage(values);
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
                <Button type='submit' disabled={!values.message} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>;
};

export default Messages;
