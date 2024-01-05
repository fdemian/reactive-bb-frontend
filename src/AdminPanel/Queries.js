import { gql } from '@apollo/client';

export const GET_POST_EDITS = gql`
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
  }`;