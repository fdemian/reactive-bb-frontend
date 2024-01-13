import { gql } from '@apollo/client';

export const BAN_USER = gql`
    mutation BanUser($user: Int!, $expires: Datetime, $reason: String!) {
        banUser(user: $user, expires: $expires, reason: $reason)
    }
`;

export const REMOVE_BAN = gql`
    mutation RemoveUserBan($user: Int!) {
        removeUserBan(user: $user)
    }
`;
