import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String!) {
    createCategory(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;