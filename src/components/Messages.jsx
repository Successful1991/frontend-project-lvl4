import React, {
  useContext,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import {
  authContext,
  serviceContext,
} from '../contexts';

const renderMessages = (messages) => messages.map((message) => (
  <li className="message" key={message.id}>
    <span className="message__user">{message.user}</span>
    :
    <span className="message__text">{message.message}</span>
  </li>
));

const Messages = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const messagesContainerRef = useRef();

  const { sendMessage } = useContext(serviceContext);
  const { user } = useContext(authContext);

  const { entities, ids } = useSelector((state) => state.messages);
  const { entities: entitiesChannels, currentChannelId } = useSelector((state) => state.channels);
  const currentMessages = useMemo(() => ids
    .filter((id) => entities[id].channelId === currentChannelId)
    .map((id) => entities[id]), [ids, entities, currentChannelId]);

  const channelName = entitiesChannels[currentChannelId]?.name;

  const onClickHandler = async ({ message }, { resetForm }) => {
    console.log(filter);
    const updatedMessage = filter.clean(message);
    const newMessage = {
      message: updatedMessage,
      channelId: currentChannelId,
      user: user.username,
    };

    await sendMessage(newMessage);
    resetForm();
  };

  useEffect(() => {
    messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: onClickHandler,
  });

  return (
    <div className="main">
      <div className="chat">
        <div className="chat__head">
          <div className="chat__title">
            #
            {channelName}
          </div>
          <div className="chat__desc">
            {currentMessages.length}
            {' '}
            { t('messages.count', { count: currentMessages.length })}
          </div>
        </div>
        <div className="chat__body">
          <div className="chat__messages">
            <ul className="messages">
              {renderMessages(currentMessages)}
            </ul>
          </div>
          <div ref={messagesContainerRef} />
        </div>
        <div className="chat__form">
          <Form onSubmit={formik.handleSubmit} className="form">
            <Form.Control
              type="text"
              name="message"
              ref={inputRef}
              value={formik.values.message}
              autoComplete="off"
              placeholder={t('messages.placeholder')}
              onChange={formik.handleChange}
              aria-label="Новое сообщение"
              className="form__input"
            />
            <div className="input-group-append form__btn">
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={!formik.values.message || formik.isSubmitting}
                name={t('buttons.send')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">{t('buttons.send')}</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
