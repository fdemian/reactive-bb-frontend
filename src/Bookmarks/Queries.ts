import { gql } from '../__generated__/gql';

export const GET_BOOKMARKS_BY_USER = gql(/* GraphQL */ `
  query GetBookmarksByUser($user: Int!) {
    bookmarksByUser(user: $user) {
      id
      post {
        id
        content
        user {
          id
          username
          avatar
        }
      }
    }
  }
`);
