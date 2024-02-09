/* eslint no-undef: 0 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.localStorage.setItem('DEFAULT_PAGE_ITEMS', '5');
global.localStorage.setItem('CONFIG', JSON.stringify({ name: 'TEST' }));
global.localStorage.setItem('OAUTH_CONFIG', JSON.stringify(OAUTH_CONFIG));
