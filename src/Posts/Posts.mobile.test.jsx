import React from 'react';
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { loggedInMocks, mockTopic, mockPosts } from './testData';
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
  };
});

test('<Posts /> > Logged out > test render (MOBILE)', async () => {
  render({
    mocks: loggedInMocks,
    initialEntries: ['/topics/1/*'],
    isLoggedIn: false,
    isMobile: true,
  });

  

  /*
    await waitFor(() => {
      expect(document.title).toStrictEqual(mockTopic.name);
    });*/

  const topicTitleTexts = await screen.findAllByText(mockTopic.name, {
    exact: false,
  });
  expect(topicTitleTexts.length).toStrictEqual(2);
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

test('<Posts /> > Logged in > Test render (MOBILE)', async () => {
  render({
    mocks: loggedInMocks,
    initialEntries: ['/topics/1/*'],
    isLoggedIn: true,
    isMobile: true,
  });

  
  expect(
    await screen.findByRole('button', { name: 'posts.main.reply' })
  ).toBeInTheDocument();
  expect(screen.getAllByText(mockTopic.name).length).toStrictEqual(2);
  expect(screen.getByText('Tag1')).toBeInTheDocument();
  expect(screen.getByText('Tag2')).toBeInTheDocument();
  expect(screen.getByText(mockTopic.category.name)).toBeInTheDocument();

  //
  expect(
    await screen.findByText('Post 1', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('Post 2', { exact: false })).toBeInTheDocument();
  
  // Post footer icons.
  const postQuoteBtn = await screen.findAllByRole('button', {
    name: 'posts.footer.quote',
  });
  expect(postQuoteBtn.length).toStrictEqual(mockPosts.posts.length);

  expect(screen.getAllByTestId('like-icon').length).toStrictEqual(
    mockPosts.posts.length
  );
  expect(screen.getAllByTestId('bookmark-icon').length).toStrictEqual(
    mockPosts.posts.length
  );
});
