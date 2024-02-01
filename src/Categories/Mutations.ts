import { gql } from '../__generated__/gql';

export const CREATE_CATEGORY =  gql(/* GraphQL */ `
  mutation CreateCategory($name: String!, $description: String!) {
    createCategory(name: $name, description: $description) {
      id
      name
      description
    }
  }
`);
