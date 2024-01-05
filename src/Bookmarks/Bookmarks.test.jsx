import { GET_BOOKMARKS_BY_USER } from './Queries';
import { GET_USER } from '../Navbar/Queries';
import { GET_ALL_CHATS } from '../Messages/Queries';
import { render, screen } from '../TestHelpers/testing-utils';
//import { getUserId } from '../Login/authUtils';
import { mockBookmarks } from './testData';
import { vi, test, expect } from 'vitest';

const firstBookmark = mockBookmarks.bookmarksByUser[0];
const secondBookmark = mockBookmarks.bookmarksByUser[1];
const user1 = firstBookmark.post.user;
const user2 = secondBookmark.post.user;

vi.mock('kalliope', () => ({
    default: ({ config }) => {
        return <div>{JSON.stringify(config.initialState)}</div>;
    }
}));

vi.mock('../Login/authUtils', async () => {
    const actual = await vi.importActual("../Login/authUtils");
    return {
        ...actual,
        getUserId: () => 1,
        getBanStatus: () => {
            return {
                banned: false,
                banReason: null
            };
        },
        getUserType: () => 'U'
    }
});


test('<Bookmarks /> > Renders correctly', async () => {
    const mocks = [
        {
            request: {
                query: GET_BOOKMARKS_BY_USER,
                variables: {
                    user: 1
                }
            },
            result: {
                loading: false,
                error: false,
                data: mockBookmarks
            }
        },
        {
            request: {
                query: GET_USER,
                variables: {
                    id: 1
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    getUser: user1
                }
            }
        },
        {
            request: {
                query: GET_USER,
                variables: {
                    id: 2
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    getUser: user2
                }
            }
        },
        {
            request: {
                query: GET_ALL_CHATS,
                variables: {
                    user: 1
                }
            },
            result: {
                loading: false,
                error: false,
                data: { chatsByUser: [] }
            }
        }
    ];

    render({
        mocks: mocks,
        initialEntries: ['/bookmarks'],
        isLoggedIn: true,
        isMobile: false
    });

    const { bookmarksByUser } = mockBookmarks;

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(
      await screen.findByText('bookmarks.bookmarks')
    ).toBeInTheDocument();

    for (const bookmark of bookmarksByUser) {
        let _username = bookmark.post.user.username;
        expect(screen.getByText(_username)).toBeInTheDocument();
    }

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks.length).toStrictEqual(5);
    expect(pageLinks[1]).toHaveAttribute('href', `/users/${user1.id}/${user1.username}`);
    expect(pageLinks[2]).toHaveAttribute('href', `/users/${user1.id}/${user1.username}`);
    expect(pageLinks[3]).toHaveAttribute('href', `/users/${user2.id}/${user2.username}`);
    expect(pageLinks[4]).toHaveAttribute('href', `/users/${user2.id}/${user2.username}`);
});
