import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    category(id: $id) {
      id
      name
      description
      topics {
        id
        name
        views
        replies
        created
        pinned
        closed
        user {
          id
          avatar
          username
        }
        category {
          id
          name
        }
      }
    }
  }
`;
