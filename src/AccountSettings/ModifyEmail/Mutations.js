import { gql } from '@apollo/client';

export const UPDATE_EMAIL = gql`
  mutation UpdateEmail($id: Int!, $email: String!) {
    updateEmail(id: $id, email: $email)
  }
`;