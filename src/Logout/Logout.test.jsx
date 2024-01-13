/* eslint-disable no-undef */
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';

const i18t = (x) => 'logout.' + x;

const RESPONSE = { ok: true };
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(RESPONSE),
  })
);

test('<Logout /> > Renders correctly.', async () => {
  render({
    mocks: [],
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/logout'],
  });

  screen.debug(undefined, 300000);

  expect(
    await screen.findByText(i18t('timedOutSession'), { exact: false })
  ).toBeInTheDocument();

  await waitFor(() => {
    //expect(screen.getByText(i18t['title'])).toBeInTheDocument();
    //expect(screen.getByText(i18t['subTitle'])).toBeInTheDocument();
    expect(screen.getByText(i18t('timedOutSession'))).toBeInTheDocument();
  });

  expect(
    screen.getByText(i18t('sessionNotRenewedPage'), { exact: false })
  ).toBeInTheDocument();

  expect(
    screen.getByText(i18t('youCan'), { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText(i18t('logBackIn'))).toBeInTheDocument();
  expect(screen.getByText(i18t('goBack'))).toBeInTheDocument();
  expect(screen.getByText(i18t('logBackIn'))).toBeInTheDocument();
  expect(screen.getByText(i18t('mainPageLink'))).toBeInTheDocument();
});
