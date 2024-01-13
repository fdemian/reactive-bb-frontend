export const mockUser = {
  id: 1,
  username: 'rulo',
  avatar: 'avatar.png',
  fullname: 'Full Name',
  email: 'rulo@rulo.com',
  status: 'A status',
  about: 'A bout',
  banned: false,
};

export const mockTopics = [
  {
    id: 12,
    name: 'Project fireworks!!!!',
    __typename: 'Topic',
  },
  {
    id: 11,
    name: 'Topic thing',
    __typename: 'Topic',
  },
];

export const mockPosts = [
  {
    id: 12,
    topicId: 13,
    content:
      '{"blocks":[{"key":"2usen","text":"Post# 90","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    __typename: 'Topic',
  },
  {
    id: 11,
    topicId: 13,
    content:
      '{"blocks":[{"key":"2usen","text":"Post# 90","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    __typename: 'Topic',
  },
];

export const mockLikes = [
  {
    id: 1,
    post: {
      id: 97,
      topicId: 2,
      content:
        '{"blocks":[{"key":"2usen","text":"Post# 90","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      __typename: 'Post',
    },
    __typename: 'Like',
  },
  {
    id: 2,
    post: {
      id: 98,
      topicId: 2,
      content:
        '{"blocks":[{"key":"2usen","text":"Post# 91","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      __typename: 'Post',
    },
    __typename: 'Like',
  },
];
