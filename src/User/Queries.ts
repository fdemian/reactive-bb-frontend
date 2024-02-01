import { gql } from '../__generated__/gql';

export const GET_USER = gql(/* GraphQL */ `
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      username
      avatar
      type
      fullname
      email
      status
      about
      banned
      banReason
    }
  }
`);

export const GET_LIKES_BY_USER = gql(/* GraphQL */ `
  query GetLikesByUser($id: Int!) {
    likesByUser(id: $id) {
      id
      post {
        id
        topicId
        content
      }
    }
  }
`);

export const GET_TOPICS_BY_USER =  gql(/* GraphQL */ `
  query GetTopicsByUser($id: Int!) {
    topicsByUser(id: $id) {
      id
      name
    }
  }
`);

export const GET_POSTS_BY_USER =  gql(/* GraphQL */ `
  query GetPostsByUser($id: Int!) {
    postsByUser(id: $id) {
      id
      content
      topicId
    }
  }
`);
