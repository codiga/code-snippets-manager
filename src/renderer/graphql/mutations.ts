import { gql } from '@apollo/client';
import { UserPreferenceKeyType } from 'renderer/types/userTypes';

export type RemoveUserPreferenceVariables = {
  key: UserPreferenceKeyType;
};

export type RemoveUserPreferenceData = {
  removeUserPreference: string;
};

export const REMOVE_USER_PREFERENCE = gql`
  mutation removeUserPreference($key: UserPreferenceKey!) {
    removeUserPreference(key: $key)
  }
`;

export type UpdateUserPreferenceVariables = {
  key: UserPreferenceKeyType;
  value: string;
};

export type UpdateUserPreferenceData = {
  updateUserPreference: string;
};

export const UPDATE_USER_PREFERENCE = gql`
  mutation updateUserPreference($key: UserPreferenceKey!, $value: String!) {
    updateUserPreference(key: $key, value: $value)
  }
`;
