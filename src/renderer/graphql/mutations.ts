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

export type SubscribeToCookbookData = {
  subscribeToCookbook: string;
};

export type SubscribeToCookbookVariables = {
  id: number;
};

export const SUBSCRIBE_TO_COOKBOOK = gql`
  mutation subscribeToCookbook($id: Long!) {
    subscribeToCookbook(id: $id)
  }
`;

export type UnsubscribeToCookbookData = {
  unsubscribeFromCookbook: string;
};

export const UNSUBSCRIBE_TO_COOKBOOK = gql`
  mutation unsubscribeFromCookbook($id: Long!) {
    unsubscribeFromCookbook(id: $id)
  }
`;

export type SubscribeToRecipeData = {
  subscribeToRecipe: string;
};

export type SubscribeToRecipeVariables = {
  id: number;
};

export const SUBSCRIBE_TO_RECIPE = gql`
  mutation subscribeToRecipe($id: Long!) {
    subscribeToRecipe(id: $id)
  }
`;

export type UnsubscribeToRecipeData = {
  subscribeToRecipe: string;
};

export const UNSUBSCRIBE_TO_RECIPE = gql`
  mutation unsubscribeFromRecipe($id: Long!) {
    unsubscribeFromRecipe(id: $id)
  }
`;
