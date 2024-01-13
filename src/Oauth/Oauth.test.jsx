/* eslint no-undef: 0 */ //
import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import { vi, test, expect } from 'vitest';

const service = 'testservice';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

test('Oauth > User authenticated correctly', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    id: 1,
                    ok: true,
                    ttl: 500,
                }),
        })
    );

    render({
        isMobile: false,
        isLoggedIn: false,
        mocks: [],
        initialEntries: [`/oauth/${service}`],
    });

    expect(
        await screen.findByText(`oauth.loggingInWith ${service}`)
    ).toBeInTheDocument();
    expect(
        screen.getByText('oauth.loggingInWith', { exact: false })
    ).toBeInTheDocument();
    expect(
        screen.getByText('oauth.waitWarning', { exact: false })
    ).toBeInTheDocument();

    // If the user has correctly logged in, it should redirect to the home URL.
    await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(-2);
    });
});

test('Oauth > User authentication error', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    id: null,
                    ok: false,
                    ttl: 0,
                }),
        })
    );

    render({
        mocks: [],
        initialEntries: [`/oauth/${service}`],
        isLoggedIn: false,
        isMobile: false,
    });

    expect(
        await screen.findByText(`oauth.loggingInWith ${service}`, {
            exact: false,
        })
    ).toBeInTheDocument();
    expect(
        screen.getByText('oauth.waitWarning', { exact: false })
    ).toBeInTheDocument();

    // If the user has correctly logged in, it should redirect to the home URL.
    await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
            `/autherror/${service}`
        );
    });
});

test('OauthError > Renders correctly', async () => {
    render({
        mocks: [],
        initialEntries: [`/autherror/${service}`],
        isLoggedIn: false,
        isMobile: false,
    });

    expect(await screen.findByText('oauth.authFailed')).toBeInTheDocument();
    expect(
        screen.getByText(`oauth.oauthUsing ${service} oauth.failed`)
    ).toBeInTheDocument();
    expect(screen.getByText('oauth.loginSuggestion')).toBeInTheDocument();
    expect(screen.getByText('oauth.loginPageBtn'));
});
