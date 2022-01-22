import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../store/channel-slice';
import { showModal } from '../store/modal-slice';

const CreateDropdown = ({ item, handleShowModal }) => {
  const { t } = useTranslation();
  return (
    <Dropdown className="channel__dropdown">
      <Dropdown.Toggle as="button" split className="dropdown__open dropdown-toggle" id="dropdown-channel">
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={() => handleShowModal('removing', { item })}>{t('buttons.delete')}</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => handleShowModal('renaming', { item })}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const renderChannel = (channel, handlerChangeChannel, handleShowModal) => {
  const dropdown = channel.removable
    && <CreateDropdown handleShowModal={handleShowModal} item={channel} />;
  return (
    <li className="channel" key={channel.id}>
      <span>#</span>
      <button
        type="button"
        className="btn channel__link text-start text-truncate"
        onClick={handlerChangeChannel(channel.id)}
      >
        {channel.name ?? ''}
      </button>
      {dropdown || null}
    </li>
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const { entities, ids } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handlerChangeChannel = useCallback((channel) => (event) => {
    event.preventDefault();
    dispatch(setCurrentChannelId(channel));
  }, []);

  const handleShowModal = useCallback((type, props) => {
    dispatch(showModal({
      type,
      props,
    }));
  }, []);

  const channelsList = ids.length
    ? ids.map((id) => renderChannel(entities[id], handlerChangeChannel, handleShowModal))
    : '';

  return (
    <div className="sidebar">
      <div className="sidebar__head">
        <div className="sidebar__title">{t('channels.title')}</div>
        <button
          type="button"
          className="sidebar__btn text-primary"
          onClick={() => handleShowModal('adding')}
          aria-label="+"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <div className="sidebar__body">
        <ul className="channels">
          {channelsList}
        </ul>
      </div>
    </div>
  );
};

export default Channels;
