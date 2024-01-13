import { GET_ALL_NOTIFICATIONS } from './Queries';
import { render, screen } from '../TestHelpers/testing-utils';
//import { getUserId } from '../Login/authUtils';
import { vi, test, expect } from 'vitest';

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
    getBanStatus: () => {
      return {
        banned: false,
        banReason: null,
      };
    },
    getUserType: () => 'U',
  };
});

const mocks = [
  {
    request: {
      query: GET_ALL_NOTIFICATIONS,
      variables: {
        user: 1,
        limit: 5,
        offset: 0,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        allNotifications: [
          {
            id: 1,
            link: 'notifications/1/test',
            type: 'mention',
            read: false,
            originator: {
              id: 2,
              avatar: null,
              username: 'user2',
            },
            user: {
              id: 1,
              avatar: null,
              username: 'user',
            },
          },
        ],
      },
    },
  },
];

test('<Notifications /> > Renders correctly', async () => {
  render({
    mocks: mocks,
    initialEntries: ['/notifications'],
    isLoggedIn: true,
    isMobile: false,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  expect(await screen.findByText('navbar.notifications')).toBeInTheDocument();

  expect(screen.getByText('user2')).toBeInTheDocument();
  expect(screen.getByText('navbar.mentionUser')).toBeInTheDocument();
  expect(screen.getByText('UNREAD')).toBeInTheDocument();
});
