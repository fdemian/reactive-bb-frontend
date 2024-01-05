import { GET_TOPIC, GET_POSTS, GET_BOOKMARKS_BY_POSTS } from './Queries';
import {
    INCREASE_VIEW_COUNT,
    LIKE_POST,
    BOOKMARK_POST,
    REMOVE_BOOKMARK,
    REMOVE_LIKE,
} from './Mutations';
import { GET_USER } from '../Navbar/Queries';

const MOCK_POST =
    '{"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a test code (Post 1)","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quoted text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"quote","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}},"lastSaved":1656964749895,"source":"Playground","version":"0.3.6"}';

const MOCK_POST_2 =
    '{"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a test code (Post 2)","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quoted text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"quote","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}},"lastSaved":1656964749895,"source":"Playground","version":"0.3.6"}';

export const mockUser = {
    id: 1,
    avatar: null,
    username: 'rulo',
    status: 'By demons driven!',
};

export const mockUser2 = {
    id: 1,
    avatar: 'avatar.png',
    username: 'user',
    status: '',
};

export const mockCategory = {
    id: 1,
    name: 'Category1',
};

export const mockTopic = {
    id: 1,
    name: 'Test topic',
    views: 0,
    replies: 2,
    created: '2022-10-16T19:44:45.342636',
    pinned: false,
    closed: false,
    active: true,
    tags: 'Tag1,Tag2',
    user: mockUser,
    category: mockCategory,
};

export const mockPosts = {
    posts: [
        {
            id: 1,
            content: MOCK_POST,
            created: '2022-10-16T19:44:45.342636',
            edited: false,
            likes: [],
            user: mockUser,
        },
        {
            id: 2,
            content: MOCK_POST_2,
            created: '2022-10-16T19:44:45.342636',
            edited: false,
            likes: [],
            user: mockUser2,
        },
    ],
};

export const loggedInMocks = [
    {
        request: {
            query: GET_TOPIC,
            variables: {
                id: 1,
            },
        },
        result: {
            data: {
                topic: mockTopic,
            },
        },
    },
    {
        request: {
            query: GET_POSTS,
            variables: {
                topicId: 1,
                limit: 5,
                offset: 0,
            },
        },
        result: {
            loading: false,
            error: false,
            data: mockPosts,
        },
    },
    {
        request: {
            query: GET_USER,
            variables: {
                userId: 1,
            },
        },
        result: {
            loading: false,
            error: false,
            data: mockUser,
        },
    },
    {
        request: {
            query: INCREASE_VIEW_COUNT,
            variables: {
                topic: 1,
            },
        },
        result: {
            data: {
                increaseViewCount: { id: 1, ok: true },
            },
        },
    },
    {
        request: {
            query: GET_BOOKMARKS_BY_POSTS,
            variables: {
                user: 1,
                posts: [1, 2],
            },
        },
        result: {
            data: {
                bookmarksByPostList: [],
            },
        },
    },
    {
        request: {
            query: LIKE_POST,
            variables: {
                originator: 1,
                user: 1,
                post: 1,
                topic: 1,
            },
        },
        result: {
            data: {
                likePost: {
                    id: 1,
                    ok: true,
                    postId: 1,
                    likes: 1,
                },
            },
        },
    },
    {
        request: {
            query: REMOVE_LIKE,
            variables: {
                user: 1,
                post: 1,
            },
        },
        result: {
            data: {
                removeLike: {
                    id: 1,
                    ok: true,
                    postId: 1,
                    userId: 1,
                    likes: [
                        {
                            id: 1,
                            userId: 1,
                            postId: 1,
                        },
                    ],
                },
            },
        },
    },
    {
        request: {
            query: BOOKMARK_POST,
            variables: {
                user: 1,
                post: 1,
            },
        },
        result: {
            data: {
                bookmarkPost: {
                    id: 1,
                    ok: true,
                    postId: 1,
                    userId: 1,
                },
            },
        },
    },
    {
        request: {
            query: REMOVE_BOOKMARK,
            variables: {
                user: 1,
                post: 1,
            },
        },
        result: {
            data: {
                id: 1,
                ok: true,
                postId: 1,
                userId: 1,
            },
        },
    },
];