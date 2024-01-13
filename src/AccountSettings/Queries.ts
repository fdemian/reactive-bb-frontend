import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      username
      avatar
      email
      status
      about
    }
  }
`;
