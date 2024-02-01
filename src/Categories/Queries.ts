import { gql } from '../__generated__/gql';

export const GET_CATEGORIES = gql(/* GraphQL */ `
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`);
