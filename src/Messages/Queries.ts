import { gql } from '../__generated__/gql';

export const GET_ALL_CHATS = gql(/* GraphQL */ `
  query GetChatsByUser($user: Int!) {
    chatsByUser(user: $user) {
      id
      avatar
      username
    }
  }
`);

export const GET_CHAT = gql(/* GraphQL */ `
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
`);

export const CHATS_SUBSCRIPTION = gql(/* GraphQL */ `
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
`);
