import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      showCount
      savedShows {
        _id
        name
        genre
        showId
        url
        summary
      }
    }
  }
`;
