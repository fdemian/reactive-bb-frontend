import { gql } from '../__generated__/gql';

export const GET_NOTIFICATIONS = gql(/* GraphQL */ `
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
`);

export const NOTIFICATIONS_SUBSCRIPTION = gql(/* GraphQL */ `
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
`);

export const CHATS_SUBSCRIPTION = gql(/* GraphQL */ `
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
`);

export const MARK_NOTIFICATIONS_READ = gql(/* GraphQL */ `
  mutation MarkNotificationsRead($notifications: [Int!]) {
    markNotificationsRead(notifications: $notifications)
  }
`);
