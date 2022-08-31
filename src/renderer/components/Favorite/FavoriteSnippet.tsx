import { useMutation } from '@apollo/client';
import { useToast } from '@codiga/components';
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
import {
  GET_SHARED_RECIPES_VARIABLES,
  GET_USER_RECIPES_VARIABLES,
  GET_USER_SUBSCRIBED_RECIPES_VARIABLES,
} from '../../graphql/variables';
import Favorite, { FavoriteProps } from './Favorite';

type FavoriteRecipeProps = Pick<FavoriteProps, 'isSubscribed'> & {
  recipeId: number;
};

const recipeRefetches = [
  {
    query: GET_USER_RECIPES,
    variables: GET_USER_RECIPES_VARIABLES,
  },
  {
    query: GET_USER_SUBSCRIBED_RECIPES,
    variables: GET_USER_SUBSCRIBED_RECIPES_VARIABLES,
  },
  {
    query: GET_SHARED_RECIPES,
    variables: GET_SHARED_RECIPES_VARIABLES,
  },
  GET_RECIPES_SEMANTICALLY,
];

export default function FavoriteSnippet({
  isSubscribed,
  recipeId,
}: FavoriteRecipeProps) {
  const toast = useToast();

  const [favoriteRecipe] = useMutation(SUBSCRIBE_TO_RECIPE);
  const [unfavoriteRecipe] = useMutation(UNSUBSCRIBE_TO_RECIPE);

  const onFavoriteRecipe = async () => {
    try {
      await favoriteRecipe({
        variables: {
          id: recipeId,
        },
        awaitRefetchQueries: true,
        refetchQueries: recipeRefetches,
      });
    } catch (err) {
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
        awaitRefetchQueries: true,
        refetchQueries: recipeRefetches,
      });
    } catch (err) {
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
