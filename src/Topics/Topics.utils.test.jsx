import { getFilteredTopics } from './utils';
import { vi, test, expect } from 'vitest';

vi.mock('../App/utils', () => ({
    getDefaultPageItems: () => 5,
    setConfig: () => {},
    getConfig: () => ({ name: 'Morpheus' }),
    setOauthConfig: () => {},
    getOauthConfig: () => {},
    setIsMobile: () => {},
    getIsMobile: () => {},
    setDefaultPageItems: () => {},
    getDefaultLocale: () => {},
    setDefaultLocale: () => {}
}));

const mockTopics = {
    topicsCount: 7,
    topics: [
        {
            __typename: 'Topic',
            active: true,
            category: null,
            closed: false,
            created: 'Thu, 09 Dec 2021 15:51:18 GMT',
            id: 2,
            name: 'What\u2019s that thing under the first post?',
            pinned: false,
            replies: 502,
            user: {
                __typename: 'User',
                avatar:
                    '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo'
            },
            views: 253
        },
        {
            __typename: 'Topic',
            active: true,
            category: null,
            created: 'Fri, 10 Dec 2021 10:38:07 GMT',
            closed: false,
            id: 3,
            name: 'RE: Post0 requalified',
            pinned: false,
            replies: 1,
            user: {
                __typename: 'User',
                id: 1,
                avatar:
                    '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                username: 'rulo'
            },
            views: 17
        },
        {
            __typename: 'Topic',
            active: true,
            category: null,
            created: 'Sun, 12 Dec 2021 15:55:31 GMT',
            closed: false,
            id: 4,
            name: 'Test Topic #1',
            pinned: false,
            replies: 4,
            user: {
                __typename: 'User',
                avatar:
                    '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo'
            },
            views: 12
        },
        {
            __typename: 'Topic',
            active: true,
            category: null,
            created: 'Sun, 12 Dec 2021 15:57:44 GMT',
            closed: false,
            id: 5,
            name: 'Test Topic #2',
            pinned: false,
            replies: 1,
            user: {
                __typename: 'User',
                avatar:
                    '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo'
            },
            views: 3
        },
        {
            __typename: 'Topic',
            active: true,
            category: null,
            created: 'Sun, 12 Dec 2021 15:58:42 GMT',
            closed: false,
            id: 6,
            name: 'Test Topic #3',
            pinned: false,
            replies: 1,
            user: {
                __typename: 'User',
                avatar:
                    '/api/uploads%3Fname%3DOne-punch-man-saitama-ok-decal-black_1024x1024.jpg',
                id: 1,
                username: 'rulo'
            },
            views: 4
        }
    ]
};


test('<TopicsList /> > Utils > getFilteredTopics  > no filters (ALL topics)', () => {
    const { topics } = mockTopics;
    expect(getFilteredTopics(topics, 'all')).toStrictEqual(topics);
});

test('<TopicsList /> > Utils > getFilteredTopics  > Uncategorized', () => {
    const { topics } = mockTopics;
    expect(getFilteredTopics(topics, 'uncategorized')).toStrictEqual(topics);
});

test('<TopicsList /> > Utils > getFilteredTopics > other category', () => {
    expect(getFilteredTopics(mockTopics.topics, 'nonsense')).toStrictEqual([]);
})