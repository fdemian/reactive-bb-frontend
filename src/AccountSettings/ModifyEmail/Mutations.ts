import { gql } from '../../__generated__/gql';

export const UPDATE_EMAIL = gql(/* GraphQL */ `
  mutation UpdateEmail($id: Int!, $email: String!) {
    updateEmail(id: $id, email: $email)
  }
`);
