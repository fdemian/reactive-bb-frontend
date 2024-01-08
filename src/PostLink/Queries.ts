import { gql } from '@apollo/client';

export const GET_POSITION_IN_PAGE = gql`
  query GetPositionId($post: Int!, $itemscount: Int!) {
    postLink(post: $post, itemscount: $itemscount) {
      topicId
      page
      name
    }
  }
`;