import { render, screen } from '../TestHelpers/testing-utils';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD } from './Mutations';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';

const userEmail = 'email@email.com';
const newPass = '!1password23455690';
const token = 'aaaaeeeeebbbbccc55566';

const requestResetMocks = [
  {
    request: {
      query: RESET_PASSWORD_REQUEST,
      variables: {
        email: userEmail,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        resetPasswordRequest: true,
      },
    },
  },
];

const resetPasswordMocks = [
  {
    request: {
      query: RESET_PASSWORD,
      variables: {
        token: token,
        password: newPass,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        resetPassword: true,
      },
    },
  },
];

const resetPasswordMocksFail = [
  {
    request: {
      query: RESET_PASSWORD,
      variables: {
        token: token,
        password: newPass,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        resetPassword: false,
      },
    },
  },
];

test('<ResetPassword /> > Reset Password', async () => {
  const user = userEvent.setup();
  render({
    mocks: requestResetMocks,
    initialEntries: ['/forgotpass'],
    isLoggedIn: false,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  const allByText = await screen.findAllByText('register.resetPass');
  expect(allByText.length).toStrictEqual(3);

  expect(screen.getByRole('form')).toHaveFormValues({ email: '' });

  await user.type(screen.getByRole('input', { name: 'email' }), userEmail);

  expect(screen.getByRole('form')).toHaveFormValues({ email: userEmail });
  expect(
    screen.getByRole('button', { name: 'register.resetPass' })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'register.resetPass' }));

  expect(
    await screen.findByText('register.requestResetSuccess', {
      exact: false,
    })
  ).toBeInTheDocument();
});

test('<ResetPassword /> > Reset Password activation', async () => {
  const user = userEvent.setup();
  render({
    mocks: resetPasswordMocks,
    initialEntries: [`/resetpass/${token}`],
    isLoggedIn: false,
  });

  expect(await screen.findByRole('form')).toHaveFormValues({ password: '' });

  expect(screen.getByRole('textbox', { name: 'register.resetPass input' }));

  await user.type(
    screen.getByRole('textbox', { name: 'register.resetPass input' }),
    newPass
  );

  expect(await screen.findByRole('form')).toHaveFormValues({
    password: newPass,
  });

  expect(
    await screen.findByRole('button', { name: 'register.resetPass' })
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'register.resetPass' }));

  expect(
    await screen.findByText('register.passwordResetSuccess')
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'register.home' })
  ).toBeInTheDocument();
});

test('<ResetPassword /> > Reset Password activation fail', async () => {
  const user = userEvent.setup();
  render({
    mocks: resetPasswordMocksFail,
    initialEntries: [`/resetpass/${token}`],
    isLoggedIn: false,
  });

  expect(await screen.findByRole('form')).toHaveFormValues({ password: '' });

  expect(screen.getByRole('textbox', { name: 'register.resetPass input' }));

  await user.type(
    screen.getByRole('textbox', { name: 'register.resetPass input' }),
    newPass
  );

  expect(await screen.findByRole('form')).toHaveFormValues({
    password: newPass,
  });

  expect(
    await screen.findByRole('button', { name: 'register.resetPass' })
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'register.resetPass' }));

  expect(
    await screen.findByText('register.passwordResetError')
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'register.home' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'register.resetPassRepeat' })
  ).toBeInTheDocument();
});
