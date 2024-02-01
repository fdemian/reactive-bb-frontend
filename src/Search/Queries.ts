import { gql } from '../__generated__/gql';

export const SEARCH_TERM = gql(/* GraphQL */ `
  query GetSearch(
    $term: String!
    $where: [String!]
    $limit: Int!
    $offset: Int!
  ) {
    search(term: $term, where: $where, limit: $limit, offset: $offset) {
      results {
        id
        text
        topicId
        topic
      }
      total
    }
  }
`);
