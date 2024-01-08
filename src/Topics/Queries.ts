import { gql } from '@apollo/client';

export const GET_TOPICS = gql`
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
`;


export const GET_PINNED_TOPICS = gql`
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
`;



export const PIN_TOPIC = gql`
  mutation PinTopic($topic: Int!) {
    pinTopic(topic: $topic)
  }
`;
