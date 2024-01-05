import { gql } from '@apollo/client';

export const RESET_PASSWORD_REQUEST = gql`
  mutation ResetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;