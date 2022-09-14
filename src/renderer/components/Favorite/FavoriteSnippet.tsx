import { useMutation } from '@apollo/client';
import { useToast } from '@codiga/components';
import { useRollbar } from '@rollbar/react';
import { LogArgument } from 'rollbar';

import useQueryVariables from '../../hooks/useQueryVariables';
import {
  SUBSCRIBE_TO_RECIPE,
  UNSUBSCRIBE_TO_RECIPE,
} from '../../graphql/mutations';
import {
  GET_RECIPES_SEMANTICALLY,
  GET_SHARED_RECIPES,
  GET_USER_RECIPES,
  GET_USER_SUBSCRIBED_RECIPES,
} from '../../graphql/queries';
import Favorite, { FavoriteProps } from './Favorite';
import { useUser } from '../UserContext';

type FavoriteRecipeProps = Pick<FavoriteProps, 'isSubscribed'> & {
  recipeId: number;
};

export default function FavoriteSnippet({
  isSubscribed,
  recipeId,
}: FavoriteRecipeProps) {
  const toast = useToast();
  const rollbar = useRollbar();
  const { id: userId } = useUser();

  const [favoriteRecipe] = useMutation(SUBSCRIBE_TO_RECIPE);
  const [unfavoriteRecipe] = useMutation(UNSUBSCRIBE_TO_RECIPE);

  const myVariables = useQueryVariables('my-snippets');
  const favoriteVariables = useQueryVariables('favorite-snippets');
  const teamVariables = useQueryVariables('team-snippets');
  const searchVariables = useQueryVariables('home');

  const refetchQueries = [
    {
      query: GET_USER_SUBSCRIBED_RECIPES,
      variables: favoriteVariables,
      context: { debounceKey: 'favorite-snippets' },
    },
    {
      query: GET_USER_RECIPES,
      variables: myVariables,
      context: { debounceKey: 'my-snippets' },
    },
    {
      query: GET_SHARED_RECIPES,
      variables: teamVariables,
      context: { debounceKey: 'team-snippets' },
    },
    {
      query: GET_RECIPES_SEMANTICALLY,
      variables: searchVariables,
      context: { debounceKey: 'search' },
    },
  ];

  const onFavoriteRecipe = async () => {
    try {
      await favoriteRecipe({
        variables: {
          id: recipeId,
        },
        refetchQueries,
      });
    } catch (err) {
      rollbar.error('Error favoriting snippet', err as LogArgument, {
        recipeId,
        isSubscribed,
        userId,
      });
      toast({
        status: 'error',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  const onUnfavoriteRecipe = async () => {
    try {
      await unfavoriteRecipe({
        variables: {
          id: recipeId,
        },
        refetchQueries,
      });
    } catch (err) {
      rollbar.error('Error unfavoriting snippet', err as LogArgument, {
        recipeId,
        isSubscribed,
        userId,
      });
      toast({
        status: 'error',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <Favorite
      isSubscribed={isSubscribed}
      onSubscribe={onFavoriteRecipe}
      onUnsubscribe={onUnfavoriteRecipe}
    />
  );
}
