import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      username
      avatar
      type
      banned
      banReason
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query Notifications($user: Int!) {
    notifications(user: $user) {
      id
      link
      type
      read
      originator {
        id
        avatar
        username
      }
      user {
        id
        avatar
        username
      }
    }
  }
`;

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription NotificationAdded($user: Int!) {
    notificationAdded(user: $user) {
      link
      type
      read
      originator {
        id
        avatar
        username
      }
      user {
        id
        avatar
        username
      }
    }
  }
`;

export const CHATS_SUBSCRIPTION = gql`
  subscription ChatNotification($user: Int!) {
    chatNotification(user: $user) {
      read
      author {
        id
        avatar
        username
      }
      recipient {
        id
        avatar
        username
      }
    }
  }
`;

export const MARK_NOTIFICATIONS_READ = gql`
  mutation MarkNotificationsRead($notifications: [Int!]) {
    markNotificationsRead(notifications: $notifications)
  }
`;
