import { render, screen } from '../TestHelpers/testing-utils';
import { loggedInMocks } from '../Posts/testData';
import { GET_POSITION_IN_PAGE } from './Queries';
import { GraphQLError } from 'graphql';
import { vi, test, expect } from 'vitest';

vi.mock('kalliope', () => ({
  default: ({ config }) => {
    return <div>{JSON.stringify(config.initialState)}</div>;
  },
}));

vi.mock('../App/utils', async () => {
  const actual = await vi.importActual('../App/utils');
  return {
    ...actual,
    getDefaultPageItems: () => 5,
  };
});

const variables = {
  post: 1,
  itemscount: 5,
};

const linkSuccessMock = [
  {
    request: {
      query: GET_POSITION_IN_PAGE,
      variables: variables,
    },
    result: {
      loading: false,
      error: false,
      data: {
        postLink: {
          topicId: 1,
          page: 1,
          name: 'A Topic Name',
        },
      },
    },
  },
];

const linkErrorMock = [
  {
    request: {
      query: GET_POSITION_IN_PAGE,
      variables: variables,
    },
    result: {
      errors: [new GraphQLError('Error!')],
    },
  },
];

test('<PostLink /> > <PostLinkError />', async () => {
  render({
    mocks: linkErrorMock,
    initialEntries: ['/postlink/1'],
    isLoggedIn: true,
    isMobile: false,
  });

  //
  expect(
    await screen.findByText('postLink.postAccessError')
  ).toBeInTheDocument();

  expect(screen.getByText('postLink.invalidLink')).toBeInTheDocument();
  expect(
    screen.getByText('postLink.canDoText', { exact: false })
  ).toBeInTheDocument();
  expect(
    screen.getByText('postLink.postDeleted', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('postLink.searchPosts')).toBeInTheDocument();
  expect(
    screen.getByText('postLink.topicDeleted', { exact: false })
  ).toBeInTheDocument();
  expect(
    screen.getByText('postLink.goMainPage', { exact: false })
  ).toBeInTheDocument();
});

test('<PostLink /> > <PostLink /> success', async () => {
  const mockNavigateComp = vi.fn();
  vi.doMock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Navigate: (props) => {
        return mockNavigateComp(props);
      },
    };
  });

  const mocks = linkSuccessMock.concat(loggedInMocks);

  render({
    mocks: mocks,
    initialEntries: ['/postlink/1'],
    isLoggedIn: true,
    isMobile: false,
  });

  //const topicName = format_title_string('A Topic Name');
  //const expectedURL = `/topics/1/${topicName}/${variables.post}?page=5#post-${variables.post}`;
  const testTopics = await screen.findAllByText('Test topic');
  expect(testTopics.length).toStrictEqual(2);
});
