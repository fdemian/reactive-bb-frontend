import { gql } from '../__generated__/gql';

export const CREATE_POST = gql(/* GraphQL */ `
  mutation CreateTopic(
    $user: Int!
    $name: String!
    $content: String!
    $category: Int
    $tags: String
  ) {
    createTopic(
      user: $user
      name: $name
      content: $content
      category: $category
      tags: $tags
    ) {
      id
      ok
    }
  }
`);
