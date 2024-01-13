/* eslint no-undef: 0 */ //
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.doMock('../Login/authUtils', async () => {
    const actual = await vi.importActual('../Login/authUtils');
    return {
        ...actual,
        getOauthConfig: () =>
            JSON.parse(
                '{"services":[{"name":"google","scope":"email profile","clientId":"<CLIENT_ID>","link":"https://accounts.google.com/o/oauth2/v2/auth","extraParams":"&prompt=consent&access_type=offline"},{"name":"github","scope":"user:email","clientId":"<CLIENT_ID>","link":"https://github.com/login/oauth/authorize","extraParams":""}],"redirectURI":"www.redirect.com"}'
            ),
    };
});

vi.doMock('../App/utils', async () => {
    const actual = await vi.importActual('../App/utils');
    return {
        ...actual,
        getOauthConfig: () => ({ services: [] }),
    };
});

const RESPONSE = {
    id: 1,
    ok: true,
    ttl: 500,
    banned: false,
    banReason: null,
    type: 'A',
};

test("<Login /> > Login > Logged in (redirects to '/').", async () => {
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

    render({
        mocks: [],
        initialEntries: ['/login'],
        isLoggedIn: true,
        isMobile: false,
    });

    expect(screen.queryByRole('form')).not.toBeInTheDocument();

    await waitFor(() => {
        expect(mockNavigateComp).toHaveBeenCalledWith({
            to: '/',
            replace: true,
        });
    });
});

test('<Login /> > Login > Form interaction.', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(RESPONSE),
        })
    );

    render({
        mocks: [],
        initialEntries: ['/login'],
        isLoggedIn: false,
        isMobile: false,
    });

    expect(await screen.findByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('form')).toHaveFormValues({
        username: '',
        password: '',
    });

    //
    expect(
        screen.getByRole('link', { name: 'login.forgotPass' })
    ).toBeInTheDocument();
    expect(
        screen.getByRole('link', { name: 'login.forgotPass' })
    ).toHaveAttribute('href', '/forgotpass');

    const textboxes = screen.getAllByRole('textbox');
    const usernameInput = textboxes[0];
    const passwordInput = textboxes[1];

    await user.type(usernameInput, 'user1');
    await user.type(passwordInput, 'pass');

    expect(screen.getByRole('form')).toHaveFormValues({
        username: 'user1',
        password: 'pass',
    });

    expect(
        await screen.findByRole('button', { name: 'login.login' })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'login.login' }));
});
