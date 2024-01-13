import { gql } from '@apollo/client';

export const ADD_POST = gql`
  mutation AddPost($user: Int!, $topic: Int!, $content: JSON!) {
    createPost(user: $user, topic: $topic, content: $content) {
      content
      user {
        id
        avatar
        username
      }
    }
  }
`;

export const INCREASE_VIEW_COUNT = gql`
  mutation IncreaseViewCount($topic: Int!) {
    increaseViewCount(topic: $topic) {
      id
      ok
    }
  }
`;

export const FLAG_POST = gql`
  mutation FlagPost($post: Int!, $user: Int!, $reason: Int!, $text: String) {
    flagPost(post: $post, user: $user, reason: $reason, text: $text)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($user: Int!, $originator: Int!, $topic: Int!, $post: Int!) {
    likePost(user: $user, originator: $originator, topic: $topic, post: $post) {
      id
      ok
      postId
      likes
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($user: Int!, $post: Int!) {
    removeLike(user: $user, post: $post) {
      id
      ok
      postId
      likes
    }
  }
`;

export const BOOKMARK_POST = gql`
  mutation BookmarkPost($user: Int!, $post: Int!) {
    bookmarkPost(user: $user, post: $post) {
      id
      ok
      postId
      userId
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation RemoveBookmark($user: Int!, $post: Int!) {
    removeBookmark(user: $user, post: $post) {
      id
      ok
      postId
      userId
    }
  }
`;

export const CLOSE_TOPIC = gql`
  mutation CloseTopic($topic: Int!) {
    closeTopic(topic: $topic)
  }
`;

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($topic: Int!) {
    deleteTopic(topic: $topic)
  }
`;

export const REOPEN_TOPIC = gql`
  mutation ReopenTopic($topic: Int!) {
    reopenTopic(topic: $topic)
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($post: Int!, $user: Int!) {
    deletePost(post: $post, user: $user) {
      ok
      id
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($post: Int!, $user: Int!, $content: JSON!) {
    editPost(post: $post, user: $user, content: $content) {
      id
      ok
      content
      __typename
    }
  }
`;
