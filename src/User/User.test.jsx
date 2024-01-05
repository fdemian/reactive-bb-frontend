import { render, screen, waitFor } from '../TestHelpers/testing-utils';
import userEvent from '@testing-library/user-event';
import {
    GET_USER,
    GET_LIKES_BY_USER,
    GET_TOPICS_BY_USER,
    GET_POSTS_BY_USER,
} from './Queries';
import { vi, test, expect } from 'vitest';
import { mockUser, mockLikes, mockTopics, mockPosts } from './testData';

vi.mock('kalliope', () => ({
    default: ({ config }) => {
        return <div>{JSON.stringify(config.initialState)}</div>;
    },
}));

const mocks = [
    {
        request: {
            query: GET_USER,
            variables: {
                id: 1,
            },
        },
        result: {
            loading: false,
            error: false,
            data: { getUser: mockUser },
        },
    },
    {
        request: {
            query: GET_LIKES_BY_USER,
            variables: { id: 1 },
        },
        result: {
            loading: false,
            error: false,
            data: { likesByUser: mockLikes },
        },
    },
    {
        request: {
            query: GET_TOPICS_BY_USER,
            variables: { id: 1 },
        },
        result: {
            loading: false,
            error: false,
            data: { topicsByUser: mockTopics },
        },
    },
    {
        request: {
            query: GET_POSTS_BY_USER,
            variables: { id: 1 },
        },
        result: {
            loading: false,
            error: false,
            data: { postsByUser: mockPosts },
        },
    },
];

vi.mock('../Login/authUtils', async () => {
    const actual = await vi.importActual("../Login/authUtils");
    return {
        ...actual,
        getUserId: () => 1
    }
});

test('<User /> > Renders correctly.', async () => {
    const _userEvent = userEvent.setup();
    render({
        mocks: mocks,
        initialEntries: ['/users/1/rulo'],
        isMobile: false,
        isLoggedIn: true,
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    await waitFor(() => {
        const avatars = screen.getAllByRole('img', {
            name: `Avatar of ${mockUser.username}`,
        });
        expect(avatars.length).toStrictEqual(6);
    });

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockUser.fullname)).toBeInTheDocument();
    expect(screen.getByText(mockUser.status)).toBeInTheDocument();
    expect(screen.getByText(mockUser.about)).toBeInTheDocument();
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText(`Topics by ${mockUser.username}`)).toBeInTheDocument();

    // Change between menues.
    // Moved over from previous test.
    expect(await screen.findByTestId('user-topics')).toBeInTheDocument();
    expect(screen.queryByTestId('user-posts')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-likes')).not.toBeInTheDocument();

    for (const topic of mockTopics) {
        expect(screen.getByText(topic.name)).toBeInTheDocument();
    }

    await _userEvent.click(screen.getByText('Posts'));

    expect(await screen.findByTestId('user-posts')).toBeInTheDocument();

    expect(screen.queryByTestId('user-topics')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-likes')).not.toBeInTheDocument();
    await _userEvent.click(screen.getByText('Likes'));

    expect(await screen.findByTestId('user-likes')).toBeInTheDocument();

    expect(screen.queryByTestId('user-posts')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-topics')).not.toBeInTheDocument();
});
