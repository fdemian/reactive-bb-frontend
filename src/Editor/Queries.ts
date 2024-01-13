import { gql } from '@apollo/client';

export const GET_MENTION_USERS = gql`
    query GetMentionCandidates($search: String!) {
        mentionCandidates(search: $search) {
            id
            username
            avatar
            banned
            banReason
            banExpires
        }
    }
`;

export const SET_MENTIONS = gql`
    mutation SetMentions(
        $link: String!
        $user: String!
        $mentioned: [String!]
    ) {
        setMentions(link: $link, user: $user, mentioned: $mentioned)
    }
`;

export const UPLOAD_IMAGE = gql`
    mutation UploadImage($image: Upload!) {
        uploadImage(image: $image) {
            src
        }
    }
`;
