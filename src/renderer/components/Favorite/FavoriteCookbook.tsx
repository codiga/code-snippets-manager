import { useMutation } from '@apollo/client';
import { useToast } from '@codiga/components';
import { useRollbar } from '@rollbar/react';
import { LogArgument } from 'rollbar';

import useQueryVariables from '../../hooks/useQueryVariables';
import {
  SUBSCRIBE_TO_COOKBOOK,
  UNSUBSCRIBE_TO_COOKBOOK,
} from '../../graphql/mutations';
import {
  GET_SHARED_COOKBOOKS,
  GET_USER_COOKBOOKS,
  GET_USER_SUBSCRIBED_COOKBOOKS,
} from '../../graphql/queries';
import Favorite, { FavoriteProps } from './Favorite';
import { useUser } from '../UserContext';

type FavoriteCookbookProps = Pick<FavoriteProps, 'isSubscribed'> & {
  cookbookId: number;
};

export default function FavoriteCookbook({
  isSubscribed,
  cookbookId,
}: FavoriteCookbookProps) {
  const toast = useToast();
  const rollbar = useRollbar();
  const { id: userId } = useUser();

  const [favoriteCookbook] = useMutation(SUBSCRIBE_TO_COOKBOOK);
  const [unfavoriteCookbook] = useMutation(UNSUBSCRIBE_TO_COOKBOOK);

  const myVariables = useQueryVariables('my-cookbooks');
  const favoriteVariables = useQueryVariables('favorite-cookbooks');
  const teamVariables = useQueryVariables('team-cookbooks');

  const refetchQueries = [
    {
      query: GET_USER_SUBSCRIBED_COOKBOOKS,
      variables: favoriteVariables,
      context: { debounceKey: 'favorite-cookbooks' },
    },
    {
      query: GET_USER_COOKBOOKS,
      variables: myVariables,
      context: { debounceKey: 'my-cookbooks' },
    },
    {
      query: GET_SHARED_COOKBOOKS,
      variables: teamVariables,
      context: { debounceKey: 'team-cookbooks' },
    },
  ];

  const onFavoriteCookbook = async () => {
    try {
      await favoriteCookbook({
        variables: {
          id: cookbookId,
        },
        refetchQueries,
      });
    } catch (err) {
      rollbar.error('Error favoriting cookbook', err as LogArgument, {
        cookbookId,
        isSubscribed,
        userId,
      });
      toast({
        status: 'error',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  const onUnfavoriteCookbook = async () => {
    try {
      await unfavoriteCookbook({
        variables: {
          id: cookbookId,
        },
        refetchQueries,
      });
    } catch (err) {
      rollbar.error('Error unfavoriting cookbook', err as LogArgument, {
        cookbookId,
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
      onSubscribe={onFavoriteCookbook}
      onUnsubscribe={onUnfavoriteCookbook}
    />
  );
}
