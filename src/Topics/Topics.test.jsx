import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { GET_TOPICS, GET_PINNED_TOPICS } from './Queries';
import { GET_CATEGORIES } from '../Categories/Queries';
import { vi, test, expect } from 'vitest';

vi.mock('../App/utils', () => ({
  getDefaultPageItems: () => 5,
  setConfig: () => {},
  getConfig: () => ({ name: 'Morpheus' }),
  setOauthConfig: () => {},
  getOauthConfig: () => {},
  setIsMobile: () => {},
  getIsMobile: () => {},
  setDefaultPageItems: () => {},
  getDefaultLocale: () => {},
  setDefaultLocale: () => {},
}));

const i18n = (x) => 'topics.' + x;
const mockTopics = {
  topicsCount: 7,
  topics: [
    {
      __typename: 'Topic',
      active: true,
      category: null,
      closed: false,
      created: 'Thu, 09 Dec 2021 15:51:18 GMT',
      id: 2,
      name: 'What\u2019s that thing under the first post?',
      pinned: false,
      replies: 502,
      user: {
        __typename: 'User',
        avatar:
          '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
        id: 1,
        username: 'rulo',
      },
      views: 253,
    },
    {
      __typename: 'Topic',
      active: true,
      category: null,
      created: 'Fri, 10 Dec 2021 10:38:07 GMT',
      closed: false,
      id: 3,
      name: 'RE: Post0 requalified',
      pinned: false,
      replies: 1,
      user: {
        __typename: 'User',
        id: 1,
        avatar:
          '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
        username: 'rulo',
      },
      views: 17,
    },
    {
      __typename: 'Topic',
      active: true,
      category: null,
      created: 'Sun, 12 Dec 2021 15:55:31 GMT',
      closed: false,
      id: 4,
      name: 'Test Topic #1',
      pinned: false,
      replies: 4,
      user: {
        __typename: 'User',
        avatar:
          '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
        id: 1,
        username: 'rulo',
      },
      views: 12,
    },
    {
      __typename: 'Topic',
      active: true,
      category: null,
      created: 'Sun, 12 Dec 2021 15:57:44 GMT',
      closed: false,
      id: 5,
      name: 'Test Topic #2',
      pinned: false,
      replies: 1,
      user: {
        __typename: 'User',
        avatar:
          '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
        id: 1,
        username: 'rulo',
      },
      views: 3,
    },
    {
      __typename: 'Topic',
      active: true,
      category: null,
      created: 'Sun, 12 Dec 2021 15:58:42 GMT',
      closed: false,
      id: 6,
      name: 'Test Topic #3',
      pinned: false,
      replies: 1,
      user: {
        __typename: 'User',
        avatar:
          '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
        id: 1,
        username: 'rulo',
      },
      views: 4,
    },
  ],
};

const mockCategories = [];

test('<TopicsList /> > Logged out > No topics > Renders no topics page', async () => {
  const mocks = [
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
    },
  ];

  render({
    mocks: mocks,
    isLoggedIn: false,
    isMobile: false,
    initialEntries: ['/'],
  });

  
  expect(await screen.findByText(i18n('noTopics'))).toBeInTheDocument();
});

test('<TopicsList /> > Logged out > Topics present.', async () => {
  const mocks = [
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
          topics: mockTopics,
        },
      },
    },
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
          topics: mockTopics,
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
          categories: mockCategories,
        },
      },
    },
  ];

  render({
    mocks: mocks,
    isLoggedIn: false,
    isMobile: false,
    initialEntries: ['/'],
  });

  

  await waitFor(() => {
    expect(screen.getByText(i18n('topics'))).toBeInTheDocument();
  });

  const authors = await screen.findAllByText(i18n('author'));
  expect(authors.length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('author')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('created')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('replies')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('views')).length).toStrictEqual(5);

  // await waitFor(() => {
  //   expect(screen.getAllByTestId('topic-link').length).toStrictEqual(5);
  //   });

  // for (let link of links) {
  //   expect(link).toHaveAttribute('href', `/topics/item.id/format_title_string(item.name)`);
  //   //expect(link).toHaveAttribute('href', `/topics/${item.id}/${format_title_string(item.name)}`);
  // }
});

test('<TopicsList /> > Logged in > Topics present.', async () => {
  const mocks = [
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
          topics: mockTopics,
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
          categories: mockCategories,
        },
      },
    },
  ];

  render({
    mocks: mocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/'],
  });

  
  expect(await screen.findByText(i18n('topics'))).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('+ ' + i18n('newTopic'))).toBeInTheDocument();
  });

  expect(screen.getByText(i18n('topics'))).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();

  expect(screen.getAllByText(i18n('author')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('created')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('replies')).length).toStrictEqual(5);
  expect(screen.getAllByText(i18n('views')).length).toStrictEqual(5);

  //for let topic in mockTopics.topics {
  //   expect(/topics/${item.id}/${format_title_string(item.name)}
  //}
});
