import { gql } from '@apollo/client';

export const GET_ALL_CHATS = gql`
  query GetChatsByUser($user: Int!) {
    chatsByUser(user: $user) {
      id
      avatar
      username
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($userA: Int!, $userB: Int!, $offset: Int!, $limit: Int!) {
    chat(userA: $userA, userB: $userB, offset: $offset, limit: $limit) {
      date
      content
      author {
        id
        avatar
        username
      }
      recipient {
        id
        avatar
        username
      }
    }
  }
`;

export const CHATS_SUBSCRIPTION = gql`
  subscription ChatAdded($userA: Int!, $userB: Int!) {
    chatAdded(userA: $userA, userB: $userB) {
      date
      content
      author {
        id
        avatar
        username
      }
      recipient {
        id
        avatar
        username
      }
    }
  }
`;
