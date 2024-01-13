import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { loggedInMocks, mockPosts, mockTopic } from './testData';
import { expect, test, vi } from 'vitest';

vi.mock('kalliope', () => ({
  default: ({ config }) => {
    return <div>{JSON.stringify(config.initialState)}</div>;
  },
}));

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

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
    getUserType: () => 'U',
  };
});

test('<Posts /> > Logged out > test render', async () => {
  render({
    mocks: loggedInMocks,
    initialEntries: ['/topics/1/topicname'],
    isLoggedIn: false,
    isMobile: false,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();

  const topicTitleTexts = await screen.findAllByText(mockTopic.name);
  expect(topicTitleTexts.length).toStrictEqual(2);

  await waitFor(() => {
    expect(document.title).toStrictEqual(`${mockTopic.name} - Morpheus`);
  });

  expect(
    await screen.findByRole('button', { name: 'posts.main.loginToReply' })
  ).toBeInTheDocument();

  expect(screen.getByText(mockTopic.category.name)).toBeInTheDocument();
  expect(screen.getByText('Tag1')).toBeInTheDocument();
  expect(screen.getByText('Tag2')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Post 1', { exact: false })).toBeInTheDocument();
  });

  expect(screen.getByText('Post 2', { exact: false })).toBeInTheDocument();
});

test('<Posts /> > Logged in > Test render.', async () => {
  render({
    mocks: loggedInMocks,
    initialEntries: ['/topics/1/topicname'],
    isLoggedIn: true,
    isMobile: false,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: 'posts.main.reply' })
  ).toBeInTheDocument();

  expect(screen.getAllByText(mockTopic.name).length).toStrictEqual(2);
  expect(screen.getByText('Tag1')).toBeInTheDocument();
  expect(screen.getByText('Tag2')).toBeInTheDocument();
  expect(screen.getByText(mockTopic.category.name)).toBeInTheDocument();

  const postQuoteBtn = await screen.findAllByRole('button', {
    name: 'posts.footer.quote',
  });
  expect(postQuoteBtn.length).toStrictEqual(mockPosts.posts.length);

  expect(
    await screen.findByText('Post 1', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('Post 2', { exact: false })).toBeInTheDocument();
  expect(screen.getAllByTestId('bookmark-icon').length).toStrictEqual(2);
  expect(screen.getAllByTestId('like-badge').length).toStrictEqual(2);
});

test('<Posts /> > Logged in > Test interaction.', async () => {
  const user = userEvent.setup();

  render({
    mocks: loggedInMocks,
    initialEntries: ['/topics/1/topicname'],
    isLoggedIn: true,
    isMobile: false,
  });

  expect(screen.getByText('Loading')).toBeInTheDocument();
  const bookmarkIcon = await screen.findAllByTestId('bookmark-icon');
  expect(bookmarkIcon.length).toStrictEqual(2);

  expect(screen.getAllByTestId('like-badge').length).toStrictEqual(2);

  await user.hover(screen.getAllByTestId('like-icon')[0]);
  expect(await screen.findByText('posts.footer.likePost')).toBeInTheDocument();

  expect(screen.queryByText(`1 posts.footer.likes`)).not.toBeInTheDocument();

  // Like and remove like.
  await user.click(screen.getAllByTestId('like-icon')[0]);
  expect(screen.getByText(`1 posts.footer.likes`)).toBeInTheDocument();
  await user.click(screen.getAllByTestId('like-badge')[0]);
  expect(screen.queryByText(`1 posts.footer.likes`)).not.toBeInTheDocument();

  await user.hover(screen.getAllByTestId('bookmark-icon')[0]);
  expect(
    await screen.findByText('posts.footer.bookmarkPost')
  ).toBeInTheDocument();
  await user.click(screen.getAllByTestId('bookmark-icon')[0]);

  expect(screen.getByTestId('bookmarked-post-icon')).toBeInTheDocument();
});
