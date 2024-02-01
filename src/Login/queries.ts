import { gql } from '../__generated__/gql';

export const GET_IS_LOGGED_IN =  gql(/* GraphQL */ `
  query GetLogin {
    loggedIn @client
  }
`);

export const SET_LOGIN =  gql(/* GraphQL */ `
  query SetLogin($status: Boolean!) {
    loggedIn(status: $status)
  }
`);
