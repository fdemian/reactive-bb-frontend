/* eslint no-undef: 0 */
import '@testing-library/jest-dom';

const OAUTH_CONFIG = {
  services: [
    {
      name: 'google',
      scope: 'email profile',
      clientId: '<CLIENT_ID>',
      link: 'https://accounts.google.com/o/oauth2/v2/auth',
      extraParams: '&prompt=consent&access_type=offline',
    },
  ],
  redirectURI: 'www.redirect.com',
};

global.localStorage.setItem('CONFIG', JSON.stringify({ name: 'TEST' }));
global.localStorage.setItem('OAUTH_CONFIG', JSON.stringify(OAUTH_CONFIG));
