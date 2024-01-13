import { render, screen } from '../TestHelpers/testing-utils';
import { vi, test, expect, afterEach, beforeEach } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

test('Routes > <NoMatchRoute />', async () => {
  render({
    mocks: [],
    initialEntries: ['/notmatchingroute'],
    isMobile: false,
    isLoggedIn: true,
  });

  expect(
    await screen.findByText('nomatch.pageDoesNotExist')
  ).toBeInTheDocument();
  expect(screen.getByText('nomatch.home')).toBeInTheDocument();
});

test('Routes > <PrivateRoute /> > Logged in > Private route. Renders private route.', async () => {
  render({
    mocks: [],
    initialEntries: ['/'],
    isMobile: false,
    isLoggedIn: false,
  });

  expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
});

test('Routes > <PrivateRoute /> > Logged out > Renders public route correctly.', async () => {
  render({
    isLoggedIn: false,
    isMobile: false,
    initialEntries: ['/'],
  });

  expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
});
