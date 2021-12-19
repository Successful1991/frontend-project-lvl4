// @ts-check

const prefix = 'api/v1';

export default {
  loginPath: () => [prefix, 'login'].join('/'),
  signUp: () => [prefix, 'signup'].join('/'),
  channelsPath: () => [prefix, 'data'].join('/'),
};
