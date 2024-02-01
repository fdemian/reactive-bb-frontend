import { gql } from '../__generated__/gql';

export const GET_POST_EDITS = gql(/* GraphQL */ `
  query PostEdits($limit: Int!, $offset: Int!) {
    postEdits(limit: $limit, offset: $offset) {
      postEdits {
        user {
          id
          avatar
          username
        }
        date
        previous
        current
      }
      editsCount
    }
  }
`);
