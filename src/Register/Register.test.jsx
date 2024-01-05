import { render, screen } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { CREATE_USER, VALIDATE_USER } from './Mutations';
import { CHECK_USERNAME } from './Queries';
import { vi, test, expect, beforeEach } from 'vitest';

vi.doMock('../App/utils', async () => {
    const actual = await vi.importActual("../App/utils");
    return {
       ...actual,
       getOauthConfig: () => ({ services: [] })
    }
});

let mocks;
let activationMocksError;
beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();

    mocks = [
        {
            request: {
                query: CREATE_USER,
                variables: {
                    username: 'user1',
                    password: 'password123',
                    email: 'user1@mail.com'
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    createUser: {
                        ok: true,
                        id: 1,
                        message: '',
                        email: ''
                    }
                }
            }
        },
        {
            request: {
                query: CHECK_USERNAME,
                variables: {
                    username: 'user1'
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    checkUsername: {
                        exists: false
                    }
                }
            }
        },
        {
            request: {
                query: CHECK_USERNAME,
                variables: {
                    username: 'user'
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    checkUsername: {
                        exists: false
                    }
                }
            }
        }
    ];

    activationMocksError = [
        {
            request: {
                query: VALIDATE_USER,
                variables: { token: 'token1' }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    validateUser: {
                        id: -1,
                        ok: false
                    }
                }
            }
        }
    ];


})

test('<Register /> > Register screen > Form interaction > Error', async () => {
    const user = userEvent.setup();

    render({
        mocks: mocks,
        isLoggedIn: false,
        initialEntries: ['/register']
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(await screen.findByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('form')).toHaveFormValues({
        username: '',
        email: '',
        password: '',
        passwordrepeat: ''
    });

    await user.type(screen.getByRole('textbox', { name: 'username' }), 'user1');
    await user.type(screen.getByRole('textbox', { name: 'email' }), 'user1@mail.com');
    await user.type(screen.getByRole('textbox', { name: 'password' }), 'password123');
    await user.type(
        screen.getByRole('textbox', { name: 'passwordrepeat' }),
        'password231'
    );

    expect(screen.getByRole('form')).toHaveFormValues({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'password123',
        passwordrepeat: 'password231'
    });

    await user.click(screen.getByRole('button', { name: 'register.register' }));

    screen.debug(undefined, 3000000);

    expect(
        await screen.findByText('register.passNoMatch')
    ).toBeInTheDocument();
});

test('<Register /> > Register success screen.', async () => {
    render({
        mocks: mocks,
        isLoggedIn: false,
        initialEntries: ['/registersuccess/1']
    });

    expect(await screen.findByRole('button', { name: 'register.home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'register.login' })).toBeInTheDocument();
    expect(screen.getByText('register.registerSuccess')).toBeInTheDocument();
    expect(screen.getByText('register.registerSuccessSub')).toBeInTheDocument();
});

test('<Register /> > User activation screen > ActivationError', async () => {
    render({
        mocks: activationMocksError,
        initialEntries: ['/activation/token1']
    });
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(await screen.findByText('Error')).toBeInTheDocument();
});

test('<Register /> > User activation screen > Activation info', async () => {
    render({
        initialEntries: ['/activationinfo/email@mail.com']
    });
    expect(await screen.findByText('register.activationInfoTitle')).toBeInTheDocument();
    expect(await screen.findByText('register.activationInfoSubMail')).toBeInTheDocument();
    expect(await screen.findByText('register.doesntArrive')).toBeInTheDocument();
    expect(await screen.findByText('email@mail.com')).toBeInTheDocument();
});
