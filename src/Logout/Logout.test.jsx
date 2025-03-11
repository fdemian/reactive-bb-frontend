/* eslint-disable no-undef */
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';
import fetch from "node-fetch";

const i18t = (x) => 'logout.' + x;

const RESPONSE = { ok: true };
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(RESPONSE),
  })
);

test.skip('<Logout /> > Renders correctly.', async () => {

  vi.mock("node-fetch");
  fetch.mockReturnValue(
    Promise.resolve({ json: () => Promise.resolve({ ok: true }) })
  );

  render({
    mocks: [],
    isLoggedIn: true,
    isMobile: false,
    initialEntries: ['/logout'],
  });

  expect(screen.getByText('Loading...', { exact: false })).toBeInTheDocument();
  
  expect(
    await screen.findByText(i18t('timedOutSession'), { exact: false })
  ).toBeInTheDocument();

  /*
  expect(
    await screen.findByText(i18t('timedOutSession'), { exact: false })
  ).toBeInTheDocument();
  */

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
