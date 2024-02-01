import { gql } from '../../__generated__/gql';

export const BAN_USER = gql(/* GraphQL */ `
  mutation BanUser($user: Int!, $expires: Datetime, $reason: String!) {
    banUser(user: $user, expires: $expires, reason: $reason)
  }
`);

export const REMOVE_BAN = gql(/* GraphQL */ `
  mutation RemoveUserBan($user: Int!) {
    removeUserBan(user: $user)
  }
`);
