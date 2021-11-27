// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [prefix, 'login'].join('/'),
  channelsPath: () => [prefix, 'data'].join('/'),
};
