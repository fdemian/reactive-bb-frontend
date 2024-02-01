import { gql } from '../__generated__/gql';

export const GET_TOPICS = gql(/* GraphQL */ `
  query GetTopics($limit: Int!, $offset: Int!) {
    topics(limit: $limit, offset: $offset) {
      topics {
        id
        name
        views
        replies
        created
        closed
        pinned
        user {
          id
          avatar
          username
        }
        category {
          id
          name
        }
      }
      topicsCount
    }
  }
`);

export const GET_PINNED_TOPICS = gql(/* GraphQL */ `
  query GetPinnedTopics {
    pinnedTopics {
      id
      name
      views
      replies
      created
      closed
      pinned
      user {
        id
        avatar
        username
      }
      category {
        id
        name
      }
    }
  }
`);

export const PIN_TOPIC = gql(/* GraphQL */ `
  mutation PinTopic($topic: Int!) {
    pinTopic(topic: $topic)
  }
`);
