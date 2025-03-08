import { render, waitFor, screen } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { CREATE_USER, VALIDATE_USER } from './Mutations';
import { CHECK_USERNAME } from './Queries';
import { vi, test, expect } from 'vitest';

let mockNavigateComp;

vi.doMock('../App/utils', async () => {
  const actual = await vi.importActual('../App/utils');
  return {
    ...actual,
    getOauthConfig: () => ({ services: [] }),
  };
});

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        username: 'user1',
        password: 'password123',
        email: 'user1@mail.com',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        createUser: {
          ok: true,
          id: 1,
          message: '',
          email: '',
        },
      },
    },
  },
  {
    request: {
      query: CHECK_USERNAME,
      variables: {
        username: 'user1',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        checkUsername: {
          exists: false,
        },
      },
    },
  },
  {
    request: {
      query: CHECK_USERNAME,
      variables: {
        username: 'user',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        checkUsername: {
          exists: false,
        },
      },
    },
  },
];

const activationMocks = [
  {
    request: {
      query: VALIDATE_USER,
      variables: { token: 'token1' },
    },
    result: {
      loading: false,
      error: false,
      data: {
        validateUser: {
          id: 1,
          ok: true,
        },
      },
    },
  },
];

vi.clearAllMocks();

test('<Register /> > Register screen > Form interaction > Success', async () => {
  const user = userEvent.setup();
  mockNavigateComp = vi.fn();
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Navigate: (props) => {
        console.clear();
        console.log(props);
        console.log("@@@@@@@@@@@----->");
        return mockNavigateComp(props);
      },
    };
  });

  render({
    mocks: mocks,
    isLoggedIn: false,
    initialEntries: ['/register'],
  });

  expect(await screen.findByRole('form')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('form')).toHaveFormValues({
      username: '',
      email: '',
      password: '',
      passwordrepeat: '',
    });
  });

  await user.type(screen.getByRole('textbox', { name: 'username' }), 'user1');
  await user.type(
    screen.getByRole('textbox', { name: 'email' }),
    'user1@mail.com'
  );
  await user.type(
    screen.getByRole('textbox', { name: 'password' }),
    'password123'
  );
  await user.type(
    screen.getByRole('textbox', { name: 'passwordrepeat' }),
    'password123'
  );

  expect(screen.getByRole('form')).toHaveFormValues({
    username: 'user1',
    email: 'user1@mail.com',
    password: 'password123',
    passwordrepeat: 'password123',
  });

  await user.click(screen.getByRole('button', { name: 'register.register' }));

  await waitFor(() => {
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  expect(mockNavigateComp).toHaveBeenCalledWith({ to: '/activationinfo/' });
});

test('<Register /> > User activation screen > ActivationSuccess', async () => {
  mockNavigateComp = vi.fn();
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Navigate: (props) => {
        return mockNavigateComp(props);
      },
    };
  });

  render({
    isLoggedIn: false,
    mocks: activationMocks,
    initialEntries: ['/activation/token1'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  await waitFor(() => {
    expect(mockNavigateComp).toHaveBeenCalledOnce();
  });
  expect(mockNavigateComp).toHaveBeenCalledWith({
    to: `/registersuccess/1`,
    replace: true,
  });
});
