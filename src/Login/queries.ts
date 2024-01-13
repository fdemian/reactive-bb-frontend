import { gql } from '@apollo/client';

export const GET_IS_LOGGED_IN = gql`
    query GetLogin {
        loggedIn @client
    }
`;

export const SET_LOGIN = gql`
    query SetLogin($status: Boolean!) {
        loggedIn(status: $status)
    }
`;
