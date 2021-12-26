// @ts-check

const prefix = 'api/v1';

export default {
  homePage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  login: () => [prefix, 'login'].join('/'),
  signUp: () => [prefix, 'signup'].join('/'),
  channelsPath: () => [prefix, 'data'].join('/'),
};
