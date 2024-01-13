import { gql } from '@apollo/client';

export const SEND_PM = gql`
    mutation SendMessage(
        $author: Int!
        $recipient: Int!
        $message: JSON!
        $newchat: Boolean!
    ) {
        sendMessage(
            author: $author
            recipient: $recipient
            message: $message
            newchat: $newchat
        )
    }
`;
