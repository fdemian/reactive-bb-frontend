import { render, screen } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import { GET_POST_EDITS } from './Queries';
import { vi, test, expect } from 'vitest';

const previousPost = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
const currentPost =  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

vi.mock('../Editor/Renderer', () => ({
    default: ({ content }) => {
        return <div>{content}</div>;
    },
}));

vi.mock('../Login/authUtils', async () => {
    const actual = await vi.importActual("../Login/authUtils");
    return {
        ...actual,
        getUserId: () => 1,
        getUserType: () => 'A'
    }
});

test('<AdminPanel /> > <ModerationLog /> > No moderation logs', async () => {
    const mocks = [
        {
            request: {
                query: GET_POST_EDITS,
                variables: {
                    limit: 5,
                    offset: 0,
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    postEdits: {
                        postEdits: [],
                        editsCount: 0
                    }
                }
            }
        }
    ];

    render({
        mocks: mocks,
        isLoggedIn: true,
        isMobile: false,
        initialEntries: ['/admincp'],
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(
        await screen.findByRole("button", { name: "editedPosts" })
    ).toBeInTheDocument();

    expect(screen.getAllByText("admincp.editedPosts").length).toStrictEqual(2);
    expect(screen.getByText("admincp.noModLogs")).toBeInTheDocument();
});

test('<AdminPanel /> > <ModerationLog /> > Moderation logs render correctly', async () => {
    const _user = userEvent.setup();
    const mocks = [
        {
            request: {
                query: GET_POST_EDITS,
                variables: {
                    limit: 5,
                    offset: 0,
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    postEdits: {
                        postEdits: [{
                          user: {
                            id: 1,
                            avatar: null,
                            username: "user"
                          },
                          date: (new Date()).toString(),
                          previous: previousPost,
                          current: currentPost
                        }],
                        editsCount: 1
                    }
                }
            }
        }
    ];

    render({
        mocks: mocks,
        isLoggedIn: true,
        isMobile: false,
        initialEntries: ['/admincp'],
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(
        await screen.findByRole("button", { name: "editedPosts" })
    ).toBeInTheDocument();

    expect(screen.getAllByText("admincp.editedPosts").length).toStrictEqual(2);
    expect(
        await screen.findByRole("img", { name: "Avatar of user"})
    ).toBeInTheDocument();
    await _user.click(screen.getByRole("img", { name: "Avatar of user"}));

    expect(
        await screen.findByText("admincp.previous")
    ).toBeInTheDocument();
    expect(screen.getByText("admincp.current")).toBeInTheDocument();
});