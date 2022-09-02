import { gql } from '@apollo/client';
import { UserPreferenceKeyType } from '../types/userTypes';

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

type VotingMutationType = {
  entityId: number;
  entityType: 'Recipe';
  isUpvote: boolean;
};

export type AddVoteMutationVariables = VotingMutationType;

export type DeleteVoteMutationVariables = Pick<
  VotingMutationType,
  'entityId' | 'entityType'
>;

export const ADD_VOTE = gql`
  mutation addVote(
    $entityId: Long!
    $entityType: VoteEntity!
    $isUpvote: Boolean!
  ) {
    addVote(entityId: $entityId, entityType: $entityType, isUpvote: $isUpvote)
  }
`;

export const DELETE_VOTE = gql`
  mutation deleteVote($entityId: Long!, $entityType: VoteEntity!) {
    deleteVote(entityId: $entityId, entityType: $entityType)
  }
`;
