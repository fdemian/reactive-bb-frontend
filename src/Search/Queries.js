import { gql } from '@apollo/client';

export const SEARCH_TERM = gql`
  query GetSearch($term: String!, $where: [String!], $limit: Int!, $offset: Int!) {
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
`;