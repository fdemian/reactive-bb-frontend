import { render, screen } from '../TestHelpers/testing-utils';
import { GET_NOTIFICATIONS } from './Queries';
import { GET_USER } from '../User/Queries';
import { GET_ALL_CHATS } from '../Messages/Queries';
import { vi, test, expect } from 'vitest';

const _user = {
  id: 1,
  username: 'adminuser',
  fullname: "",
  email: "user@emai.com",
  avatar: 'avatar.png',
  status: "",
  about: "",
  banned: false,
  banReason: null,
  banExpires: null,
  type: 'U',
};

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
  };
});

const mocks = [
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
        notifications: [],
      },
    },
  },
  {
    request: {
      query: GET_ALL_CHATS,
      variables: {
        id: 1,
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

test('<NavbarDesktop /> > Not logged in.', async () => {
  render({
    isLoggedIn: false,
    isMobile: false,
    mocks: mocks,
    initialEntries: ['/'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  const blogText = await screen.findByText('Morpheus');
  expect(blogText).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: 'Morpheus logo' })
  ).toBeInTheDocument();
  expect(
    await screen.findByText('login', { exact: false })
  ).toBeInTheDocument();
  expect(
    await screen.findByText('register', { exact: false })
  ).toBeInTheDocument();
});

test('<NavbarDesktop /> > Logged in.', async () => {
  render({
    mocks: mocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  const imgHeading = await screen.findAllByRole('img');
  expect(imgHeading.length).toStrictEqual(1);

  expect(
    screen.getByRole('img', { name: 'Morpheus logo' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('img', {
      name: `Avatar of ${_user.username}`,
    })
  ).toBeInTheDocument();

  const avatarImg =  screen.getByRole('img', {
    name: `Avatar of ${_user.username}`,
    hidden: true
  });

  expect(avatarImg).toHaveAttribute('alt', `Avatar of ${_user.username}`);
  expect(avatarImg).toHaveAttribute('src', `/static/avatars/${_user.avatar}`);
});
