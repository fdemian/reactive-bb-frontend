import { gql } from '../__generated__/gql';

export const ADD_POST = gql(/* GraphQL */ `
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
`);

export const INCREASE_VIEW_COUNT = gql(/* GraphQL */ `
  mutation IncreaseViewCount($topic: Int!) {
    increaseViewCount(topic: $topic) {
      id
      ok
    }
  }
`);

export const FLAG_POST = gql(/* GraphQL */ `
  mutation FlagPost($post: Int!, $user: Int!, $reason: Int!, $text: String) {
    flagPost(post: $post, user: $user, reason: $reason, text: $text)
  }
`);

export const LIKE_POST = gql(/* GraphQL */ `
  mutation LikePost($user: Int!, $originator: Int!, $topic: Int!, $post: Int!) {
    likePost(user: $user, originator: $originator, topic: $topic, post: $post) {
      id
      ok
      postId
      likes
    }
  }
`);

export const REMOVE_LIKE = gql(/* GraphQL */ `
  mutation RemoveLike($user: Int!, $post: Int!) {
    removeLike(user: $user, post: $post) {
      id
      ok
      postId
      likes
    }
  }
`);

export const BOOKMARK_POST = gql(/* GraphQL */ `
  mutation BookmarkPost($user: Int!, $post: Int!) {
    bookmarkPost(user: $user, post: $post) {
      id
      ok
      postId
      userId
    }
  }
`);

export const REMOVE_BOOKMARK = gql(/* GraphQL */ `
  mutation RemoveBookmark($user: Int!, $post: Int!) {
    removeBookmark(user: $user, post: $post) {
      id
      ok
      postId
      userId
    }
  }
`);

export const CLOSE_TOPIC = gql(/* GraphQL */ `
  mutation CloseTopic($topic: Int!) {
    closeTopic(topic: $topic)
  }
`);

export const DELETE_TOPIC = gql(/* GraphQL */ `
  mutation DeleteTopic($topic: Int!) {
    deleteTopic(topic: $topic)
  }
`);

export const REOPEN_TOPIC = gql(/* GraphQL */ `
  mutation ReopenTopic($topic: Int!) {
    reopenTopic(topic: $topic)
  }
`);

export const DELETE_POST = gql(/* GraphQL */ `
  mutation DeletePost($post: Int!, $user: Int!) {
    deletePost(post: $post, user: $user) {
      ok
      id
    }
  }
`);

export const EDIT_POST = gql(/* GraphQL */ `
  mutation EditPost($post: Int!, $user: Int!, $content: JSON!) {
    editPost(post: $post, user: $user, content: $content) {
      id
      ok
      content
      __typename
    }
  }
`);
