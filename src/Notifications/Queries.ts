import { gql } from '@apollo/client';

export const GET_ALL_NOTIFICATIONS = gql`
    query AllNotifications($user: Int!, $limit: Int!, $offset: Int!) {
        allNotifications(user: $user, limit: $limit, offset: $offset) {
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
