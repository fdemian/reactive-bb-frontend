import { gql } from '../__generated__/gql';

export const GET_POSITION_IN_PAGE = gql(/* GraphQL */ `
  query GetPositionId($post: Int!, $itemscount: Int!) {
    postLink(post: $post, itemscount: $itemscount) {
      topicId
      page
      name
    }
  }
`);
