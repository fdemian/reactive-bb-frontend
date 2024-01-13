import { GET_CATEGORY } from './Queries';
import { render, screen } from '../TestHelpers/testing-utils';
import { test, expect } from 'vitest';

const mockCategory = {
    __typename: 'Category',
    description: 'Default category',
    id: 0,
    name: 'Uncategorized',
    topics: [
        {
            __typename: 'Topic',
            id: 4,
            name: 'Test Topic #1',
            replies: 4,
            created: '2020-01-01',
            pinned: false,
            closed: false,
            user: {
                __typename: 'User',
                avatar: '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo',
            },
            category: {
                id: 0,
                name: 'Uncategorized',
            },
            views: 12,
        },
        {
            __typename: 'Topic',
            id: 5,
            name: 'Test Topic #2',
            created: '2020-01-01',
            pinned: false,
            closed: false,
            replies: 1,
            user: {
                __typename: 'User',
                avatar: '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo',
            },
            category: {
                id: 0,
                name: 'Uncategorized',
            },
            views: 3,
        },
        {
            __typename: 'Topic',
            id: 6,
            name: 'Test Topic #3',
            created: '2020-01-01',
            closed: false,
            pinned: false,
            replies: 1,
            user: {
                __typename: 'User',
                avatar: '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo',
            },
            category: {
                id: 0,
                name: 'Uncategorized',
            },
            views: 4,
        },
        {
            __typename: 'Topic',
            id: 7,
            name: 'Test topic #4',
            replies: 1,
            pinned: false,
            closed: false,
            created: '2020-01-01',
            user: {
                __typename: 'User',
                avatar: '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo',
            },
            category: {
                id: 0,
                name: 'Uncategorized',
            },
            views: 2,
        },
        {
            __typename: 'Topic',
            id: 8,
            name: 'sfdsdfsdfadf',
            created: '2020-01-01',
            pinned: false,
            closed: false,
            replies: 1,
            user: {
                __typename: 'User',
                avatar: '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo',
            },
            category: {
                id: 0,
                name: 'Uncategorized',
            },
            views: 2,
        },
    ],
};

test('<TopicsList /> > Renders category.', async () => {
    const mocks = [
        {
            request: {
                query: GET_CATEGORY,
                variables: {
                    id: 1,
                },
            },
            result: {
                loading: false,
                error: false,
                data: {
                    category: mockCategory,
                },
            },
        },
    ];

    render({
        isLoggedIn: true,
        mocks: mocks,
        initialEntries: ['/categories/1/:name'],
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(await screen.findByText(mockCategory.name)).toBeInTheDocument();

    for (const topic of mockCategory.topics) {
        expect(await screen.findByText(topic.name)).toBeInTheDocument();
    }
});
