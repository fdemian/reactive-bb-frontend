import { gql } from '../__generated__/gql';

export const SEND_PM = gql(/* GraphQL */ `
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
`);
