import { gql } from '../../__generated__/gql';

export const GET_FLAGGED_POSTS = gql(/* GraphQL */ `
  query GetFlaggedPosts($offset: Int!, $limit: Int!) {
    flaggedPosts(offset: $offset, limit: $limit) {
      postId
      userId
      reasonId
      reasonText
    }
  }
`);

export const REMOVE_FLAG = gql(/* GraphQL */ `
  mutation RemoveFlag($post: Int!, $user: Int!) {
    removeFlag(post: $post, user: $user) {
      postId
      userId
    }
  }
`);
