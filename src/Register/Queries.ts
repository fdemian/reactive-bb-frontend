import { gql } from '../__generated__/gql';

export const CHECK_USERNAME = gql(/* GraphQL */ `
  query CheckUsername($username: String!) {
    checkUsername(username: $username) {
      exists
    }
  }
`);
