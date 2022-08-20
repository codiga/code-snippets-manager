import { gql } from '@apollo/client';

export const CHECK_USER = gql`
  query checkUser {
    user {
      id
      username
      accountType
      preferences {
        key
        value
      }
    }
  }
`;

export const GET_USER_PREFERENCES = gql`
  query getUserPreferences {
    user {
      id
      preferences {
        key
        value
      }
    }
  }
`;
