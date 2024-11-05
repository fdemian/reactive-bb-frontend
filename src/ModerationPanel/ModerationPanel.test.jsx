import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { GET_MENTION_USERS } from '../Editor/Queries';
import { BAN_USER } from './Ban/Mutations';
import { GET_FLAGGED_POSTS } from './Flag/Queries';
import { addYears } from 'date-fns';
import { vi, test, expect } from 'vitest';
vi.mock('../../Editor/Editor', () => ({
  default: ({ containerRef }) => {
    /* eslint-disable */
    const react = require('react');
    react.useState(() => {
      const currentContainerRef = {
        getContent: () => {
          return 'CONTENT_FROM_IMPERATIVE';
        },
        clear: vi.fn(),
        focus: vi.fn(),
        executeCommand: containerRef.current.executeCommand,
      };
      containerRef.current = currentContainerRef;
    }, []);

    const updateRef = (evt) => console.log(evt.target.value);

    return <input data-testid="calliope-editor" onChange={updateRef} />;
  },
}));

window.ResizeObserver = window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn()
}));  

const banContentReason =
  '{\"root\":{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}';
const datePlus2Years = addYears(new Date(), 2);
const isoDate = datePlus2Years.toISOString();

const candidates = [
  {
    id: 1,
    username: 'user1',
    avatar: null,
    banned: false,
    banReason: null,
    banExpires: null,
  },
  {
    id: 2,
    username: 'user10',
    avatar: null,
    banned: true,
    banReason: 'BAN_REASON',
    banExpires: null,
  },
  {
    id: 3,
    username: 'user100',
    avatar: null,
    banned: true,
    banReason: 'BAN_REASON_2',
    banExpires: isoDate,
  },
];

const flaggedPosts = [
  {
    postId: 1000,
    userId: 1,
    reasonId: 1,
    reasonText: null,
  },
  {
    postId: 1000,
    userId: 1,
    reasonId: 2,
    reasonText: null,
  },
  {
    postId: 1000,
    userId: 1,
    reasonId: 3,
    reasonText: null,
  },
  {
    postId: 1000,
    userId: 1,
    reasonId: 4,
    reasonText: 'BAN_REASON_TEXT',
  },
];

const bannedMocks = [
  {
    request: {
      query: GET_FLAGGED_POSTS,
      variables: {
        offset: 0,
        limit: 5,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        flaggedPosts: flaggedPosts,
      },
    },
  },
  {
    request: {
      query: GET_MENTION_USERS,
      variables: {
        search: 'user1',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        mentionCandidates: candidates,
      },
    },
  },
  {
    request: {
      query: GET_MENTION_USERS,
      variables: {
        search: 'user1',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        mentionCandidates: candidates,
      },
    },
  },
  {
    request: {
      query: BAN_USER,
      variables: {
        user: 1,
        expires: null,
        reason: banContentReason,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        banUser: true,
      },
    },
  },
  {
    request: {
      query: BAN_USER,
      variables: {
        user: 1,
        expires: null,
        reason: "{\"root\":{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        banUser: true,
      },
    },
  },
];

const emptyMocks = [
  {
    request: {
      query: GET_FLAGGED_POSTS,
      variables: {
        offset: 0,
        limit: 5,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        flaggedPosts: [],
      },
    },
  },
  {
    request: {
      query: GET_MENTION_USERS,
      variables: {
        search: 'user1',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        mentionCandidates: candidates,
      },
    },
  },
  {
    request: {
      query: BAN_USER,
      variables: {
        user: 1,
        expires: null,
        reason: '"CONTENT_FROM_IMPERATIVE"',
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        banUser: true,
      },
    },
  },
];

test('<ModerationPanel /> > Renders correctly.', async () => {
  const user = userEvent.setup();
  render({
    mocks: bannedMocks.concat(bannedMocks),
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/modcp'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  const allBannedText = await screen.findAllByText('modcp.bannedUsers');
  expect(allBannedText.length).toStrictEqual(2);

  expect(
    screen.getAllByText('modcp.bannedUsers', { exact: false }).length
  ).toStrictEqual(2);
  expect(
    screen.getAllByText('modcp.flaggedMsg', { exact: false }).length
  ).toStrictEqual(1);

  await user.click(screen.getByRole('button', { name: 'flagged' }));

  expect(
    await screen.findByText('modcp.bannedUsers', { exact: false })
  ).toBeInTheDocument();
  expect(
    screen.getAllByText('modcp.flaggedMsg', { exact: false }).length
  ).toStrictEqual(2);
});

test('<ModerationPanel /> > <BanPanel /> > Go back', async () => {
  const user = userEvent.setup();
  render({
    mocks: bannedMocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/modcp'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findByRole('input', { name: 'modcp.searchUsers' })
  ).toBeInTheDocument();
  expect(screen.getAllByText('No data').length).toStrictEqual(2);

  // Clear and type username.
  await user.pointer({
    element: screen.getByRole('input', { name: 'modcp.searchUsers' }),
    keys: '[MouseLeft]',
  });
  await user.type(
    screen.getByRole('input', { name: 'modcp.searchUsers' }),
    'user1'
  );

  // All users should appear when searching.
  expect(await screen.findByText('user1')).toBeInTheDocument();
  expect(screen.getByText('user10')).toBeInTheDocument();
  expect(screen.getByText('user100')).toBeInTheDocument();

  // One is not banned, the other permanently banned, and the other temporarily banned.
  expect(screen.getByText('modcp.notBanned')).toBeInTheDocument();
  expect(screen.getByText('modcp.permanentlyBanned')).toBeInTheDocument();
  expect(
    screen.getByText('modcp.bannedUntil', { exact: false })
  ).toBeInTheDocument();

  // Ban user
  await user.click(screen.getByText('modcp.banUser'));

  expect(
    await screen.findByText('modcp.expirationDate', { exact: false })
  ).toBeInTheDocument();
  expect(screen.queryByText('user10')).not.toBeInTheDocument();
  expect(screen.queryByText('user100')).not.toBeInTheDocument();
  expect(screen.getByText('user1')).toBeInTheDocument();
  expect(screen.getByText('modcp.justification')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'modcp.back' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'modcp.banUser' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('checkbox', { name: 'modcp.permanent' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('checkbox', { name: 'modcp.permanent' })
  ).not.toBeChecked();

  await user.click(screen.getByRole('checkbox', { name: 'modcp.permanent' }));

  expect(
    await screen.findByRole('checkbox', { name: 'modcp.permanent' })
  ).toBeChecked();

  await user.click(screen.getByRole('button', { name: 'modcp.back' }));

  expect(
    await screen.findByRole('input', { name: 'modcp.searchUsers' })
  ).toBeInTheDocument();
  expect(screen.getAllByText('No data').length).toStrictEqual(2);
});

test('<ModerationPanel /> > <BanPanel /> > Ban user', async () => {
  const user = userEvent.setup();
  render({
    mocks: bannedMocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/modcp'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findByRole('input', { name: 'modcp.searchUsers' })
  ).toBeInTheDocument();
  expect(screen.getAllByText('No data').length).toStrictEqual(2);

  await user.pointer({
    element: screen.getByRole('input', { name: 'modcp.searchUsers' }),
    keys: '[MouseLeft]',
  });
  await user.type(
    screen.getByRole('input', { name: 'modcp.searchUsers' }),
    'user1'
  );

  // All users should appear when searching.
  expect(await screen.findByText('user1')).toBeInTheDocument();

  // Ban user
  await user.click(screen.getByText('modcp.banUser'));

  expect(await screen.findByText('modcp.expirationDate')).toBeInTheDocument();
  expect(screen.getByText('user1')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'modcp.banUser' })
  ).toBeInTheDocument();

  // Fill in the data and ban user.
  await user.click(screen.getByRole('checkbox', { name: 'modcp.permanent' }));
  expect(
    await screen.findByRole('checkbox', { name: 'modcp.permanent' })
  ).toBeChecked();
  
  await user.click(screen.getByRole('button', { name: 'modcp.banUser' }));

  screen.debug(undefined, 3000000000000000);

  expect(
    await screen.findByText('modcp.successfulBan', { exact: false })
  ).toBeInTheDocument();

});

test('<ModerationPanel /> > Renders flagged users correctly.', async () => {
  const user = userEvent.setup();
  render({
    mocks: bannedMocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/modcp'],
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findAllByText('modcp.bannedUsers', { exact: false })
  ).toBeTruthy();
  expect(
    screen.getAllByText('modcp.bannedUsers', { exact: false }).length
  ).toStrictEqual(2);
  expect(
    screen.getAllByText('modcp.flaggedMsg', { exact: false }).length
  ).toStrictEqual(1);

  await user.click(screen.getByRole('button', { name: 'flagged' }));
  await user.click(screen.getByRole('button', { name: 'flagged' }));

  await waitFor(() => {
    expect(screen.getAllByText('modcp.bannedUsers').length).toStrictEqual(1);
  });

  expect(screen.getByRole('button', { name: 'flagged' })).toBeInTheDocument();

  // Expect banned posts to be in the flag screen.
  expect(await screen.findByText('BAN_REASON_TEXT')).toBeInTheDocument();
  expect(screen.getByText('modcp.flagReason-1')).toBeInTheDocument();
  expect(screen.getByText('modcp.flagReason-2')).toBeInTheDocument();
  expect(screen.getByText('modcp.flagReason-3')).toBeInTheDocument();
});

test('<ModerationPanel /> > Renders empty flagged users.', async () => {
  const user = userEvent.setup();
  render({
    mocks: emptyMocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/modcp'],
  });

  expect(
    await screen.findAllByText('modcp.bannedUsers', { exact: false })
  ).toBeTruthy();
  expect(
    screen.getAllByText('modcp.bannedUsers', { exact: false }).length
  ).toStrictEqual(2);
  expect(
    screen.getAllByText('modcp.flaggedMsg', { exact: false }).length
  ).toStrictEqual(1);
  await user.click(screen.getByRole('button', { name: 'flagged' }));
  await user.click(screen.getByRole('button', { name: 'flagged' }));

  expect(await screen.findByText('modcp.noFlaggedPosts')).toBeInTheDocument();
});
