import { gql } from '@apollo/client';

export const GET_CONFIG = gql`
  query GetConfig {
    config {
      config
      oauth
    }
  }
`;