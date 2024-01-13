import { gql } from '@apollo/client';

export const CREATE_POST = gql`
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
`;
