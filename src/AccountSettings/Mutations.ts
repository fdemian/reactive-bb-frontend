import { gql } from '../__generated__/gql';

export const UPDATE_PASSWORD = gql(/* GraphQL */ `
  mutation UpdatePassword($id: Int!, $currentPass: String!, $newPass: String!) {
    updatePassword(id: $id, currentPass: $currentPass, newPass: $newPass) {
      ok
    }
  }
`);

export const UPDATE_PROFILE = gql(/* GraphQL */ `
  mutation UpdateProfile($id: Int!, $status: String, $about: String) {
    updateProfile(id: $id, status: $status, about: $about) {
      ok
    }
  }
`);

export const UPLOAD_AVATAR = gql(/* GraphQL */ `
  mutation uploadAvatar($image: Upload!, $id: Int!) {
    uploadUserImage(image: $image, id: $id) {
      id
      ok
    }
  }
`);

export const REMOVE_AVATAR = gql(/* GraphQL */ `
  mutation removeAvatar($id: Int!) {
    removeUserImage(id: $id)
  }
`);
