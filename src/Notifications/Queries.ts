import { gql } from '../__generated__/gql';

export const GET_ALL_NOTIFICATIONS = gql(/* GraphQL */ `
  query AllNotifications($user: Int!, $limit: Int!, $offset: Int!) {
    allNotifications(user: $user, limit: $limit, offset: $offset) {
      id
      link
      type
      read
      originator {
        id
        avatar
        username
      }
      user {
        id
        avatar
        username
      }
    }
  }
`);
