import PaginationFooter from './PaginationFooter';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '../TestHelpers/testing-utils-standalone';
import { vi, test, expect } from 'vitest';

/*
 * The control must have 5 buttons, all disabled and the text "1/1"
 * indicating we are in the first (and only) page.
 */
test('<PaginationFooter /> > Disabled because there are no pages.', async () => {
  render(
    <PaginationFooter currentPage={1} lastPage={1} onChangePage={vi.fn()} />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  });

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons[0]).toBeDisabled();
  expect(radioButtons[1]).toBeDisabled();
  expect(radioButtons[2]).toBeDisabled();
  expect(radioButtons[3]).toBeDisabled();
  expect(radioButtons[4]).toBeDisabled();
  expect(screen.getByText('1/1')).toBeInTheDocument();
});

/*
 * Control enabled.
 * Test interaction with the increase page buttons
 * (I.E go to last page and next page.)
 */
test('<PaginationFooter /> > Enabled footer > Test interaction with increase page buttons.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={1}
      lastPage={3}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  });

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons[0]).toBeDisabled();
  expect(radioButtons[1]).toBeDisabled();
  expect(radioButtons[2]).toBeEnabled();
  expect(radioButtons[3]).toBeEnabled();
  expect(radioButtons[4]).toBeEnabled();

  expect(screen.getByText('1/3')).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('radio')[3], { bubbles: true });

  await waitFor(() => {
    expect(changePageFn).toHaveBeenCalled();
  });
  expect(changePageFn).toHaveBeenCalledWith(2);

  fireEvent.click(screen.getAllByRole('radio')[4], { bubbles: true });

  await waitFor(() => {
    expect(changePageFn).toHaveBeenCalled();
  });

  expect(changePageFn).toHaveBeenCalledWith(3);
});

/*
 * Control enabled.
 * Test interaction with the decrease page buttons
 * (I.E go to first page and previous page.)
 */
test('<PaginationFooter /> > Enabled footer > Test interaction with decrease page buttons.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={3}
      lastPage={3}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  });

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons[0]).toBeEnabled();
  expect(radioButtons[1]).toBeEnabled();
  expect(radioButtons[2]).toBeEnabled();
  expect(radioButtons[3]).toBeDisabled();
  expect(radioButtons[4]).toBeDisabled();
  expect(screen.getByText('3/3')).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('radio')[0], { bubbles: true });
  await waitFor(() => {
    expect(changePageFn).toHaveBeenCalled();
  });

  expect(changePageFn).toHaveBeenCalledWith(1);

  fireEvent.click(screen.getAllByRole('radio')[1], { bubbles: true });
  await waitFor(() => {
    expect(changePageFn).toHaveBeenCalled();
  });
  expect(changePageFn).toHaveBeenCalledWith(2);
});

/*
 * Control enabled.
 * Test interaction with the page jumper control.
 */
test('<PaginationFooter /> > Enabled footer > page jumper > Test back button.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={1}
      lastPage={3}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  });

  const radioButtons = screen.getAllByRole('radio');
  fireEvent.click(radioButtons[2], { bubbles: true });

  await waitFor(() => {
    expect(screen.getByText('paginationFooter.go')).toBeInTheDocument();
  });

  expect(screen.getByText('paginationFooter.back')).toBeInTheDocument();
  expect(screen.getByRole('spinbutton')).toBeInTheDocument();

  fireEvent.click(screen.getByText('paginationFooter.back'), {
    bubbles: true,
  });
});

/*
 * Control enabled.
 * Test interaction with the page jumper control.
 */
test('<PaginationFooter /> > Invalid page change > Attempt to go to the previous page to the first page.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={1}
      lastPage={1}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getByText('1/1')).toBeInTheDocument();
  });

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons.length).toStrictEqual(5);
  fireEvent.click(radioButtons[0], { bubbles: true });

  await waitFor(() => {
    expect(changePageFn).not.toHaveBeenCalled();
  });
});

/*
 * Control enabled.
 * Test interaction with the page jumper control.
 */
test('<PaginationFooter /> > Invalid page change > Attempt to go to the next page to the last page.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={1}
      lastPage={1}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getByText('1/1')).toBeInTheDocument();
  });

  expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  fireEvent.click(screen.getAllByRole('radio')[3], { bubbles: true });

  await waitFor(() => {
    expect(changePageFn).not.toHaveBeenCalled();
  });
});

/*
 * Control enabled.
 * Test interaction with the page jumper control.
 */
test('<PaginationFooter /> > Enabled footer > page jumper > Go to page.', async () => {
  const changePageFn = vi.fn();
  render(
    <PaginationFooter
      currentPage={1}
      lastPage={3}
      onChangePage={changePageFn}
    />,
    {
      mocks: [],
      isLoggedIn: false,
    }
  );

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toStrictEqual(5);
  });

  fireEvent.click(screen.getAllByRole('radio')[2], { bubbles: true });

  await waitFor(() => {
    expect(screen.getByText('paginationFooter.go')).toBeInTheDocument();
  });

  expect(screen.getByText('paginationFooter.back')).toBeInTheDocument();
  expect(screen.getByRole('spinbutton')).toBeInTheDocument();

  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 2 } });
  await waitFor(() => {
    expect(screen.getByRole('spinbutton')).toHaveValue('2');
  });

  fireEvent.click(screen.getByText('paginationFooter.go'), { bubbles: true });
  expect(changePageFn).toHaveBeenCalledWith(2);
});
