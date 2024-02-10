import React from 'react';
import CreateMessage from './CreateMessage';
import { GET_ALL_CHATS, GET_CHAT, CHATS_SUBSCRIPTION } from './Queries';
import { GET_MENTION_USERS } from '../Editor/Queries';
import { GET_USER } from '../User/Queries';
import { SEND_PM } from './Mutations';
import { render, screen } from '../TestHelpers/testing-utils';
import { render as renderSTL } from '../TestHelpers/testing-utils-standalone';
import { vi, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


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

const user1 = {
  avatar: null,
  id: 1,
  username: 'userx',
  type: 'U',
  banned: false,
  banReason: null,
  fullname: "",
  email: "user@emai.com",
  avatar: 'avatar.png',
  status: "",
  about: "", 
  banExpires: null,
  type: 'U',
};

const user2 = {
  id: 2,
  avatar: null,
  username: 'rulo',
  type: 'U',
  banned: false,
  banReason: null,
  fullname: "",
  email: "user@emai.com",
  avatar: 'avatar.png',
  status: "",
  about: "", 
  banExpires: null,
  type: 'U',
};

const chat = {
  author: user1,
  recipient: user2,
  content: {},
  date: new Date('2022-09-18T13:49:12.767267'),
};

const chat2 = {
  author: user1,
  recipient: user2,
  content: {},
  date: new Date('2022-10-18T13:49:12.767267'),
};

vi.mock('kalliope', () => {
  return {
    getCodeLanguageOptions: () => [],
    default: ({ containerRef }) => {
      /* eslint-disable */
      const react = require('react');
      react.useState(() => {
        const currentContainerRef = {
          getContent: () => {
            return 'CALLIOPE_EDITOR_MOCK_CONTENT';
          },
          clear: vi.fn(),
        };
        if (containerRef !== null) {
          containerRef.current = currentContainerRef;
        }
      }, []);

      return <input data-testid="calliope-editor" />;
    },
  };
});


const getChatsRequest = {
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
};

const noMessageMocks = [
  getChatsRequest,
  getChatsRequest,
  getChatsRequest,
  getChatsRequest,
  {
    request: {
      query: GET_CHAT,
      variables: {
        limit: 400,
        offset: 0,
        userA: 1,
        userB: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chat: [],
      },
    },
  },
];

const messagesMock = [
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
        getUser: user1,
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
        chatsByUser: [user1],
      },
    },
  },
  {
    request: {
      query: GET_CHAT,
      variables: {
        limit: 400,
        offset: 0,
        userA: 1,
        userB: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chat: [chat],
      },
    },
  },
  {
    request: {
      query: CHATS_SUBSCRIPTION,
      variables: {
        userA: 1,
        userB: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chatAdded: chat2,
      },
    },
  },
  {
    request: {
      query: CHATS_SUBSCRIPTION,
      variables: {
        userA: 1,
        userB: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chatAdded: [],
      },
    },
  },
  {
    request: {
      query: SEND_PM,
      variables: {
        author: user1,
        recipient: user2,
        message: 'CALLIOPE_EDITOR_MOCK_CONTENT',
        newchat: false,
      },
    },
    result: {
      loading: false,
      error: false,
      data: true,
    },
  },
  {
    request: {
      query: GET_MENTION_USERS,
      variables: {
        search: 'r',
      },
    },
    result: {
      loading: false,
      error: false,
      data: [
        {
          id: 1,
          username: 'rulo',
          avatar: 'rulo.png',
        },
      ],
    },
  },
];

// Test interaction when there are no messages.
test('<Messages /> > No messages.', async () => {
  const user = userEvent.setup();

  render({
    isMobile: false,
    isLoggedIn: true,
    mocks: noMessageMocks,
    initialEntries: ['/messages'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findByText('chats.startConversation')
  ).toBeInTheDocument();
  expect(await screen.findByText('chats.noMessages')).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'chats.startConversation' })
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', { name: 'chats.startConversation' })
  );

  //expect(screen.getByRole('form')).toBeInTheDocument();

  // TODO: keep testing.
});

// Test rendering when there are messages.
test('Messages editor > Render', async () => {
  //const user = userEvent.setup();

  act(() => {
    render({
      isMobile: false,
      isLoggedIn: true,
      mocks: messagesMock,
      initialEntries: ['/messages?user=1'],
    });
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  expect(await screen.findByText('chats.title')).toBeInTheDocument();

  expect(
    screen.queryByTestId('new-conversation-modal')
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'chats.newConversation' })
  ).toBeInTheDocument();
  expect(screen.getAllByText('userx').length).toStrictEqual(4);
  expect(screen.getByText('chats.clear')).toBeInTheDocument();
  expect(screen.getByText('chats.send')).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: 'chats.newConversation',
    })
  ).toBeInTheDocument();
});

// Test interaction when there are messages.
test('<Messages /> > Messages editor > Interaction', async () => {

  act(() => {
    render({
      isMobile: false,
      isLoggedIn: true,
      mocks: messagesMock,
      initialEntries: ['/messages'],
    });
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  screen.debug(undefined, 300000000000);

  expect(await screen.findByText('chats.title')).toBeInTheDocument();

  expect(screen.getByText('chats.clear')).toBeInTheDocument();
  expect(screen.getByText('chats.send')).toBeInTheDocument();

  // TODO: file not being tested correctly.
  //const button = screen.getByRole("button", { name: "chats.clear" });
  //const sendButton = screen.getByRole("button", { name: "chats.send" });
  //await user.click(sendButton);
  //screen.debug(undefined, 300000000);
});

test('<Messages /> > <CreateMessage />', async () => {
  const user = userEvent.setup();
  const sendMessageFn = vi.fn();
  const transFn = (key) => key;

  renderSTL(
    <CreateMessage
      sendMessage={sendMessageFn}
      containerRef={{ current: null }}
      userId={1}
      t={transFn}
    />,
    {
      isLoggedIn: true,
      mocks: messagesMock,
      initialEntries: ['/messages'],
    }
  );

  expect(
    await screen.findByRole('button', { name: 'sendMessage' })
  ).toBeInTheDocument();

  await user.type(screen.getByTestId('mention-user-select'), 'rulo');

  await user.type(
    screen.getByTestId('calliope-editor'),
    'CALLIOPE_EDITOR_MOCK_CONTENT'
  );

  await user.click(screen.getByRole('button', { name: 'sendMessage' }));

  /*
    expect(
      await screen.findByText("CALLIOPE_EDITOR_MOCK_CONTENT", { exact: false })
    ).toBeInTheDocument();

    screen.debug(undefined, 3000000090);
    */

  // TODO: XXXX
  // Currently we are unable to test refetching of messages.
});
