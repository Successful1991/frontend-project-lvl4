import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const channels = useSelector(state => state.chat.channels);
  const channelsList = channels.length
    ? channels.map(channel => <li className='channel' key={channel.id}>{channel.name ?? ''}</li>)
    : '';

  return <div className='sidebar'>
    <div className='sidebar__head'>
      <div className='sidebar__title'>Каналы</div>
      <button className='sidebar__btn' onClick={() => {}}></button>
    </div>
    <div className='sidebar__body'>
      <ul className='channels'>
        {channelsList}
      </ul>
    </div>
  </div>;
};

export default Channels;
