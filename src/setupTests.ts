/* eslint no-undef: 0 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

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

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };

global.localStorage.setItem('CONFIG', JSON.stringify({ name: 'TEST' }));
global.localStorage.setItem('OAUTH_CONFIG', JSON.stringify(OAUTH_CONFIG));
