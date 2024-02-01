import { gql } from '../__generated__/gql';

export const GET_TOPIC =  gql(/* GraphQL */ `
  query GetTopic($id: Int!) {
    topic(id: $id) {
      id
      name
      views
      replies
      created
      closed
      tags
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
`);

export const GET_POSTS = gql(/* GraphQL */ `
  query GetPosts($topicId: Int!, $limit: Int!, $offset: Int!) {
    posts(topicId: $topicId, limit: $limit, offset: $offset) {
      id
      content
      edited
      created
      likes {
        id
        userId
        postId
      }
      user {
        id
        avatar
        username
        status
      }
    }
  }
`);

export const GET_BOOKMARKS_BY_POSTS = gql(/* GraphQL */ `
  query GetBookmarksByPosts($user: Int!, $posts: [Int!]) {
    bookmarksByPostList(user: $user, posts: $posts) {
      id
      userId
      postId
    }
  }
`);
