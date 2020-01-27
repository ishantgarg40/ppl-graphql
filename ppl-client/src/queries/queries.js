import { gql } from "apollo-boost";

const registerUserMutation = gql`
  mutation(
    $username: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $email: String!
  ) {
    registerUser(
      username: $username
      password: $password
      firstname: $firstname
      lastname: $lastname
      email: $email
      isVerified: false
    ) {
      username
      email
      id
    }
  }
`;

const userEmailVerificationQuery = gql`
  query($id: String!) {
    user(id: $id) {
      isVerified
    }
  }
`;

const verifyEmailMutation = gql`
  mutation($id: String!) {
    verifyUser(id: $id) {
      isVerified
    }
  }
`;

const checkUniquenessOfUsernameQuery = gql`
  query($username: String!) {
    userOnUsername(username: $username) {
      username
    }
  }
`;

const checkUniquenessOfEmailQuery = gql`
  query($email: String!) {
    userOnEmail(email: $email) {
      email
    }
  }
`;

const verifyTokenQuery = gql`
  query($token: String!) {
    verifyToken(token: $token) {
      username
    }
  }
`;

const fetchProfileInfoQuery = gql`
  query($token: String!) {
    profileInfo(token: $token) {
      username
      firstname
      lastname
    }
  }
`;

const uploadPostMutation = gql`
  mutation($token: String!, $image: Upload!, $category_id: String!) {
    uploadPost(token: $token, image: $image, category_id: $category_id) {
      user
      category
      image
    }
  }
`;

const addCategoryMutation = gql`
  mutation($name: String!, $filedata: Upload!) {
    addCategory(name: $name, filedata: $filedata) {
      id
      name
      filedata
    }
  }
`;

export {
  registerUserMutation,
  userEmailVerificationQuery,
  verifyEmailMutation,
  checkUniquenessOfUsernameQuery,
  checkUniquenessOfEmailQuery,
  verifyTokenQuery,
  fetchProfileInfoQuery,
  uploadPostMutation,
  addCategoryMutation
};
