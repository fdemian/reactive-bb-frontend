import { gql } from '@apollo/client';

export const GET_FLAGGED_POSTS = gql`
    query GetFlaggedPosts($offset: Int!, $limit: Int!) {
        flaggedPosts(offset: $offset, limit: $limit) {
            postId
            userId
            reasonId
            reasonText
        }
    }
`;

export const REMOVE_FLAG = gql`
    mutation RemoveFlag($post: Int!, $user: Int!) {
        removeFlag(post: $post, user: $user) {
            postId
            userId
        }
    }
`;
