import { gql } from '../__generated__/gql';

export const RESET_PASSWORD_REQUEST = gql(/* GraphQL */ `
  mutation ResetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`);

export const RESET_PASSWORD =  gql(/* GraphQL */ `
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`);
