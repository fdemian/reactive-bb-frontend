import { GET_CONFIG } from './Queries';
import { render, screen } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';
import { GET_PINNED_TOPICS, GET_TOPICS } from '../Topics/Queries';
import { GET_CATEGORIES } from '../Categories/Queries';

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getBanStatus: () => ({ banned: true, banReason: '' }),
  };
});

const topicMocks = {
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
};

const errorStackText =
  'ApolloError: Response not successful: Received status code 500\nat new ApolloError';
const apolloTestError = new Error('ApolloError');
apolloTestError.stack = errorStackText;
const mockOverride = [
  {
    request: {
      query: GET_CONFIG,
      variables: {},
    },
    error: apolloTestError,
  },
];

const mocks = [
  topicMocks,
  topicMocks,
  topicMocks,
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
  },
];

test('<App /> > Renders with errors.', async () => {
  render({
    mocks: mocks,
    configMockOverride: mockOverride,
    initialEntries: ['/'],
  });
  expect(screen.getByText('Loading')).toBeInTheDocument();

  expect(await screen.findByTestId('app-layout')).toBeInTheDocument();

  expect(
    await screen.findByText('Error')
  ).toBeInTheDocument();
});

test('<App /> > <BanStatusBanner />', async () => {
  render({
    mocks: mocks,
    initialEntries: ['/'],
    isLoggedIn: true,
    isMobile: false,
  });

  expect(await screen.findByTestId('app-layout')).toBeInTheDocument();

  //expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findByText('banned.banStatusNoticeText', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('banned.banStatusNotice')).toBeInTheDocument();
  expect(screen.getByText('banned.banStatusClick')).toBeInTheDocument();
});
