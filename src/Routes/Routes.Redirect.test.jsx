import {render, screen } from '../TestHelpers/testing-utils';
import { vi , test, expect, beforeAll } from 'vitest';
beforeAll(() =>{
    vi.clearAllMocks();
})

test('Routes > Logged out > Private route. Renders login component.', async () => {
    render({
        mocks: [],
        isLoggedIn: false,
        isMobile: false,
        initialEntries: ['/settings']
    });
    expect(await screen.findByRole('form')).toBeInTheDocument();
    expect(await screen.findByTestId("login-container")).toBeInTheDocument();
});
