import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      username
      avatar
      fullname
      email
      status
      about
      banned
    }
  }
`;

export const GET_LIKES_BY_USER = gql`
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
`;

export const GET_TOPICS_BY_USER = gql`
  query GetTopicsByUser($id: Int!) {
    topicsByUser(id: $id) {
      id
      name
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($id: Int!) {
    postsByUser(id: $id) {
      id
      content
      topicId
    }
  }
`;