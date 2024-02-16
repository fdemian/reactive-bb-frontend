import React from 'react';
import { UPDATE_PASSWORD, UPLOAD_AVATAR } from './Mutations';
import { GET_PROFILE } from './Queries';
import { UPDATE_EMAIL } from './ModifyEmail/Mutations';
import { CHATS_SUBSCRIPTION } from '../Navbar/Queries';
import ModifyPasswordModal from './ModifyPassword/ModifyPasswordModal';
import ModifyEmailModal from './ModifyEmail/ModifyEmailModal';
import { render as renderSTL } from '../TestHelpers/testing-utils-standalone';
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

const newAvatarName = 'chucknorris.png';
const user = {
  id: 1,
  username: 'user',
  avatar: null,
  email: 'user@user.com',
  status: '',
  about: '',
  fullname: '',
  banned: false,
  banExpires: null,
  banReason: null,
  type: 'A',
};

const user2 = {
  id: 2,
  username: 'adminuser',
  fullname: '',
  avatar: newAvatarName,
  email: 'user2@user.com',
  status: '',
  about: '',
  banned: false,
  banExpires: null,
  banReason: null,
  type: 'A',
};

const _chatNotification = {
  date: new Date(),
  content: "",
  read: false,
  author: {
    id: 1,
    avatar: "",
    username: "username"
  },
  recipient: {
    id: 2,
    avatar: "",
    username: "username"
  }
};

const i18n = (x) => `settings.${x}`;

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
  };
});

test('<Settings /> > Renders settings (Profile view)', async () => {
  const imageFile = new File(['(⌐□_□)'], newAvatarName, {
    type: 'image/png',
  });
  const _user = userEvent.setup();

  const mocks = [
    {
      request: {
        query: GET_PROFILE,
        variables: { id: 1 },
      },
      result: {
        loading: false,
        error: false,
        data: { getUser: user },
      },
    },
    {
      request: {
        query: GET_PROFILE,
        variables: { id: 1 },
      },
      result: {
        loading: false,
        error: false,
        data: { getUser: user },
      },
    },
    {
      request: {
        query: UPLOAD_AVATAR,
        variables: {
          id: 1,
          image: imageFile,
        },
      },
      result: () => {
        return {
          loading: false,
          error: false,
          data: {
            uploadUserImage: {
              id: 1,
              ok: true,
            },
          },
        };
      },
    },
    {
      request: {
        query: GET_PROFILE,
        variables: { id: 2 },
      },
      result: {
        loading: false,
        error: false,
        data: { getUser: user2 },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'newPass',
        },
      },
      result: {
        loading: false,
        error: false,
        data: { updatePassword: { ok: true } },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
      },
      result: {
        loading: false,
        error: false,
        data: { updatePassword: { ok: true } },
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
        loading: false,
        error: false,
        data: { chatNotification: _chatNotification },
      }
    }
  ];

  render({
    mocks: mocks,
    initialEntries: ['/settings'],
    isLoggedIn: true,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  const profileTexts = await screen.findAllByText(i18n('options.profile'));
  expect(profileTexts.length).toStrictEqual(2);

  expect(await screen.findByText(user.username, { hidden: 'true'})).toBeInTheDocument();

  expect(screen.getByText(i18n('profile.avatarChange'))).toBeInTheDocument();

  expect(screen.getByRole('form')).toHaveFormValues({
    status: '',
    about: '',
  });

  await _user.type(
    screen.getByRole('textbox', { name: 'Status' }),
    'NEW_STATUS'
  );
  await _user.type(
    screen.getByRole('textbox', { name: 'About me' }),
    'NEW_ABOUT_TEXT'
  );

  await waitFor(() => {
    expect(screen.getByRole('form')).toHaveFormValues({
      status: 'NEW_STATUS',
      about: 'NEW_ABOUT_TEXT',
    });
  });

  expect(screen.getByText(i18n('profile.avatarChange'))).toBeInTheDocument();
  expect(screen.getByTestId('upload-component')).toBeInTheDocument();

  expect(screen.getByText(i18n('options.securityView'))).toBeInTheDocument();

  await _user.click(screen.getByText(i18n('options.securityView')));
  expect(await screen.findByText(i18n('security.password')));

  expect(screen.getByText(i18n('security.email'))).toBeInTheDocument();
  expect(
    screen.getByText(i18n('security.currentPass') + ':')
  ).toBeInTheDocument();

  expect(
    screen.queryByText(i18n('security.passwordModalTitle'))
  ).not.toBeInTheDocument();

  await _user.click(
    screen.getByRole('button', {
      name: `password ${i18n('security.modify')}`,
    })
  );
  await waitFor(() => {
    expect(
      screen.getAllByText(i18n('security.passwordModalTitle')).length
    ).toStrictEqual(2);
  });

  await _user.click(screen.getAllByText(i18n('options.securityView'))[0]);
  await _user.click(
    screen.getByRole('button', { name: `email ${i18n('security.modify')}` })
  );

  await waitFor(() => {
    expect(
      screen.getAllByText(i18n('security.emailModalTitle')).length
    ).toStrictEqual(2);
  });
});

/*
test('<Settings /> > <ModifyPasswordModal /> Test interaction', async () => {
  const _user = userEvent.setup();
  const mocks = [
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'newPass',
        },
      },
      result: {
        loading: false,
        error: false,
        data: { updatePassword: { ok: true } },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
        result: {
          loading: false,
          error: false,
          data: { updatePassword: { ok: true } },
        },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
        result: {
          loading: false,
          error: false,
          data: { updatePassword: { ok: true } },
        },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
        result: {
          loading: false,
          error: false,
          data: { updatePassword: { ok: true } },
        },
      },
    },
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
        result: {
          loading: false,
          error: false,
          data: { updatePassword: { ok: true } },
        },
      },
    },
  ];

  renderSTL(<ModifyPasswordModal t={i18n} />, {
    mocks: mocks,
    initialEntries: ['/settings'],
    isLoggedIn: true,
  });

  expect(screen.getAllByRole('input').length).toStrictEqual(3);

  expect(screen.getByRole('form')).toHaveFormValues({
    passwordCurrent: '',
    passwordNew: '',
    passwordRepeat: '',
  });

  // Change password fields.
  await _user.type(
    screen.getByRole('input', { name: 'Password' }),
    'currentPass'
  );
  await _user.type(
    screen.getByRole('input', { name: 'Password new' }),
    'newPass'
  );
  await _user.type(
    screen.getByRole('input', { name: 'Password repeat' }),
    'newPass'
  );

  await waitFor(() => {
    expect(screen.getByRole('form')).toHaveFormValues({
      passwordCurrent: 'currentPass',
      passwordNew: 'newPass',
      passwordRepeat: 'newPass',
    });
  });

  await _user.click(screen.getByText(i18n('passwordModalTitle')));

  await waitFor(() => {
    expect(screen.getByText(i18n('passwordUpdateSuccess'))).toBeInTheDocument();
  });
});

test('<Settings /> > <ModifyPasswordModal /> Password update error', async () => {
  const _user = userEvent.setup();

  const mocks = [
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          id: 1,
          currentPass: 'currentPass',
          newPass: 'pass1',
        },
      },
      result: {
        loading: false,
        error: true,
        data: { updatePassword: { ok: false } },
      },
    },
  ];

  renderSTL(<ModifyPasswordModal t={i18n} />, {
    mocks: mocks,
    initialEntries: ['/settings'],
    isLoggedIn: true,
  });

  const passwordFields = await screen.findAllByRole('input');
  expect(passwordFields.length).toStrictEqual(3);

  expect(screen.getByRole('form')).toHaveFormValues({
    passwordCurrent: '',
    passwordNew: '',
    passwordRepeat: '',
  });

  // Change password fields.
  await _user.type(
    screen.getByRole('input', { name: 'Password' }),
    'currentPass'
  );
  await _user.type(
    screen.getByRole('input', { name: 'Password new' }),
    'pass1'
  );
  await _user.type(
    screen.getByRole('input', { name: 'Password repeat' }),
    'pass1'
  );

  await waitFor(() => {
    expect(screen.getByRole('form')).toHaveFormValues({
      passwordCurrent: 'currentPass',
      passwordNew: 'pass1',
      passwordRepeat: 'pass1',
    });
  });

  await _user.click(
    screen.getByRole('button', { name: 'Password change submit' })
  );

  await waitFor(() => {
    expect(
      screen.getAllByText(i18n('passwordUpdateError')).length
    ).toStrictEqual(2);
  });
});

test('<Settings /> > <ModifyEmailModal /> Basic interaction (Update success)', async () => {
  const _user = userEvent.setup();
  const mocks = [
    {
      request: {
        query: UPDATE_EMAIL,
        variables: {
          id: 1,
          email: 'newemail@email.com',
        },
      },
      result: {
        loading: false,
        error: false,
        data: {
          updateEmail: true,
        },
      },
    },
  ];

  renderSTL(<ModifyEmailModal user={user} t={i18n} />, {
    mocks: mocks,
    initialEntries: ['/settings'],
    isLoggedIn: true,
  });

  await waitFor(() => {
    expect(screen.getByText('user@user.com')).toBeInTheDocument();
  });

  expect(screen.getByText(user.email)).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: i18n('emailChangePlaceholder') })
  ).toHaveValue(user.email);

  expect(
    screen.getByText(i18n('emailChangeWarning'), {
      selector: '*',
      exact: false,
    })
  ).toBeInTheDocument();

  const emailTextBoxToClear = screen.getByRole('textbox', {
    name: i18n('emailChangePlaceholder'),
  });
  await _user.clear(emailTextBoxToClear);

  expect(
    screen.getByRole('textbox', { name: i18n('emailChangePlaceholder') })
  ).toHaveValue('');

  await _user.type(
    screen.getByRole('textbox', { name: i18n('emailChangePlaceholder') }),
    'newemail@email.com'
  );

  expect(await screen.findByRole('textbox')).toHaveAttribute(
    'value',
    'newemail@email.com'
  );

  await _user.click(
    screen.getByRole('button', { name: 'Email change submit' })
  );

  expect(
    await screen.findByText(i18n('updateEmailSuccess'))
  ).toBeInTheDocument();
});
*/