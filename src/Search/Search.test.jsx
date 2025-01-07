import React from 'react';
import { SEARCH_TERM } from './Queries';
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('kalliope', () => ({
  default: ({ content }) => {
    return <div>{content}</div>;
  },
}));

const searchTerm = 'SEARCH_TEST';
const mocks = [
  {
    request: {
      query: SEARCH_TERM,
      variables: {
        term: searchTerm,
        where: ['titles', 'posts'],
        limit: 5,
        offset: 0,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        search: {
          results: [
            {
              id: 1,
              text: 'CALLIOPE_EDITOR_MOCK_TEST',
              topicId: 2,
              topic: 'Test topic',
            },
          ],
          total: 1,
        },
      },
    },
  },
];

test.skip('<Search /> | No search params', async () => {
  const user = userEvent.setup();
  render({
    mocks: mocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/search'],
  });

  // No search text.
  const noSearchText = await screen.findAllByText('search.noSearch');
  expect(noSearchText.length).toStrictEqual(1);

  expect(
    await screen.findByRole('presentation', { name: 'search.search' })
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('search.searchTerm')).toBeInTheDocument();
  });

  expect(screen.getByText('search.searchInDetail')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Search input' })).toHaveAttribute(
    'placeholder',
    'search.searchTermDetail'
  );

  //
  await waitFor(() => {
    screen.getByRole('textbox', { name: 'Search input' });
  });
  expect(
    screen.getByRole('combobox', { name: 'Search dropdown' })
  ).toBeInTheDocument();
  await user.click(screen.getByRole('combobox', { name: 'Search dropdown' }));
  await waitFor(() => {
    expect(screen.getByText('titles')).toBeInTheDocument();
  });

  const titleDropdownElement = screen.getByText('titles');
  expect(titleDropdownElement).toBeInTheDocument();
  await user.click(titleDropdownElement);
  await user.type(
    screen.getByRole('textbox', { name: 'Search input' }),
    searchTerm
  );
  expect(screen.getByRole('textbox', { name: 'Search input' })).toHaveValue(
    searchTerm
  );

  // Type enter and start searching.
  await user.keyboard(
    '{Enter}',
    screen.getByRole('textbox', { name: 'Search input' })
  );
  await waitFor(() => {
    expect(
      screen.getByText('searchedFor', { exact: false })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(searchTerm, { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Test topic')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Result post link' })
  ).toHaveAttribute('href', '/postlink/1');
});

test('<Search /> | Search params from navbar', async () => {
  render({
    mocks: mocks,
    isLoggedIn: true,
    isMobile: false,
    initialEntries: [`/search?term=${searchTerm}`],
  });

  await waitFor(() => {
    expect(screen.getByText('search.searchTerm')).toBeInTheDocument();
  });
  expect(await screen.findByText('search.searchTerm')).toBeInTheDocument();
  expect(screen.getByText('search.searchIn')).toBeInTheDocument();

  screen.debug(undefined, 2000000000);

  expect(
    await screen.findByText('search.searchedFor', { exact: false })
  ).toBeInTheDocument();

  expect(screen.getByText(searchTerm)).toBeInTheDocument();

  expect(await screen.findByText('search.searchTerm')).toBeInTheDocument();
});
