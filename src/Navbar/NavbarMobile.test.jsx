import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_SUBSCRIPTION,
  CHATS_SUBSCRIPTION,
} from './Queries';
import { GET_USER } from '../User/Queries';
import { GET_ALL_CHATS } from '../Messages/Queries';
import { GET_PINNED_TOPICS, GET_TOPICS } from '../Topics/Queries';
import { GET_CATEGORIES } from '../Categories/Queries';
import { render, screen } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.doMock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
  };
});

vi.doMock('../App/utils', async () => {
  const actual = await vi.importActual('../App/utils');
  return {
    ...actual,
    getOauthConfig: () => ({ services: [] }),
  };
});

const _user = {
  id: 1,
  username: 'adminuser',
  avatar: 'avatar.png',
  banned: false,
  banReason: null,
  type: 'U',
};

const _user2 = {
  id: 2,
  username: 'moduser',
  avatar: 'mod.png',
  banned: false,
  banReason: null,
  type: 'M',
};

const notification1 = {
  id: 1,
  link: 'notifications/1/test',
  type: 'like',
  read: false,
  originator: _user2,
  user: _user,
};

const notification2 = {
  id: 2,
  link: 'notifications/2/test',
  type: 'mention',
  read: false,
  originator: _user2,
  user: _user,
};

const topicMocks = [
  {
    request: {
      query: GET_TOPICS,
      variables: {
        limit: 5,
        offset: 0,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        topics: {
          topics: [],
          topicsCount: 0,
        },
      },
    },
  },
  {
    request: {
      query: GET_PINNED_TOPICS,
      variables: {},
    },
    result: {
      loading: false,
      error: false,
      data: {
        pinnedTopics: [],
      },
    },
  },
  {
    request: {
      query: GET_CATEGORIES,
      variables: {},
    },
    result: {
      loading: false,
      error: false,
      data: {
        categories: [],
      },
    },
  }
];

const mocks = [
  ...topicMocks,
  ...topicMocks,
  {
    request: {
      query: GET_USER,
      variables: {
        id: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        getUser: _user,
      },
    },
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        notifications: [notification1],
      },
    },
  },
  {
    request: {
      query: NOTIFICATIONS_SUBSCRIPTION,
      variables: {},
    },
    result: {
      loading: false,
      error: false,
      data: {
        notificationAdded: [notification2],
      },
    },
  },
  {
    request: {
      query: CHATS_SUBSCRIPTION,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: true,
      error: false,
      data: {
        chatAdded: null,
      },
    },
  },
  {
    request: {
      query: GET_ALL_CHATS,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chatsByUser: [],
      },
    },
  },
];

test('<Navbar /> > Mobile > Not logged in.', async () => {
  const user = userEvent.setup();
  render({
    isMobile: true,
    isLoggedIn: false,
    mocks: mocks,
    initialEntries: ['/login'],
  });

  expect(
    await screen.findByRole('img', { name: 'Morpheus logo' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: 'navbar.menuTrigger' })
  ).toBeInTheDocument();

  await user.click(
    await screen.findByRole('button', { name: 'navbar.menuTrigger' })
  );

  expect(
    await screen.findByText('login.login', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('register', { exact: false })).toBeInTheDocument();
});

test('<Navbar /> > Mobile > Logged in.', async () => {
  const user = userEvent.setup();

  render({
    isMobile: true,
    isLoggedIn: true,
    mocks: mocks,
    initialEntries: ['/'],
  });

  expect(
    await screen.findByRole('button', { name: 'navbar.menuTrigger' })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'navbar.menuTrigger' }));

  expect(await screen.findByText('navbar.user')).toBeInTheDocument();
  expect(await screen.findByText('adminuser')).toBeInTheDocument();

  await user.click(screen.getByText('navbar.user'));

  // User sub-menus.
  expect(await screen.findByText('navbar.bookmarks')).toBeInTheDocument();

  expect(screen.getByText('navbar.profile')).toBeInTheDocument();

  expect(screen.getByText('navbar.settings')).toBeInTheDocument();

  expect(screen.getByText('navbar.logout')).toBeInTheDocument();

  //
  expect(screen.getByText('navbar.notifications')).toBeInTheDocument();
  expect(screen.getByText('navbar.chats')).toBeInTheDocument();
});
