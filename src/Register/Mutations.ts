import { gql } from '../__generated__/gql';

export const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      ok
      id
      message
      email
    }
  }
`);

export const VALIDATE_USER = gql(/* GraphQL */ `
  mutation ValidateUser($token: String!) {
    validateUser(token: $token) {
      id
      ok
    }
  }
`);
