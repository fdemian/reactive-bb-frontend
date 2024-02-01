import { gql } from '../__generated__/gql';

export const GET_CONFIG = gql(/* GraphQL */ `
  query GetConfig {
    config {
      config
      oauth
    }
  }
`);
