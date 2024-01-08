import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      ok
      id
      message
      email
    }
  }
`;

export const VALIDATE_USER = gql`
  mutation ValidateUser($token: String!) {
    validateUser(token: $token) {
      id
      ok
    }
  }
`;