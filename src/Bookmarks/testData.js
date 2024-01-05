export const mockBookmarks = {
    bookmarksByUser: [
        {
            id: 10,
            post: {
                id: 520,
                topicId: 12,
                content:
                    '{"blocks":[{"key":"5mt2m","text":"Ships smoking!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                user: {
                    id: 1,
                    username: 'rulo',
                    avatar: 'MGSVBB.jpeg',
                    type: 'U',
                    banned: false,
                    banReason: null,
                    __typename: 'User'
                },
                __typename: 'Post'
            },
            __typename: 'Bookmark'
        },
        {
            id: 11,
            post: {
                id: 12,
                topicId: 2,
                content:
                    '{"blocks":[{"key":"2usen","text":"Post# 5","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                user: {
                    id: 2,
                    username: 'john',
                    avatar: 'MGSVBB.jpeg',
                    type: 'U',
                    banned: false,
                    banReason: null,
                    __typename: 'User'
                },
                __typename: 'Post'
            },
            __typename: 'Bookmark'
        }
    ]
};