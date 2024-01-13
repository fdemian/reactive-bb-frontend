import { gql } from '@apollo/client';

export const GET_BOOKMARKS_BY_USER = gql`
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
`;
