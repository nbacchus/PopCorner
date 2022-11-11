import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_SHOW = gql`
  mutation saveShow($userId: ID!, $name: String!, $genre: [String], $showId: String!, $image: String!, $url: String, $summary: String) {
    saveShow(userId: $userId, name: $name, genre: $genre, showId: $showId, image: $image, url: $url, summary: $summary) {
      _id
      username
      showCount
    }
  }
`;

export const REMOVE_SHOW = gql`
  mutation removeShow($userId: ID!, $showId: String!) {
    removeShow(userId: $userId, showId: $showId) {
      savedShows {
        _id
      }
    }
  }
`;