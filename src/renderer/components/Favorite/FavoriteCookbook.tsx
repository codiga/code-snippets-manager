import { useMutation } from '@apollo/client';
import { useToast } from '@codiga/codiga-components';
import {
  SUBSCRIBE_TO_COOKBOOK,
  UNSUBSCRIBE_TO_COOKBOOK,
} from '../../graphql/mutations';
import {
  GET_SHARED_COOKBOOKS,
  GET_USER_COOKBOOKS,
  GET_USER_SUBSCRIBED_COOKBOOKS,
} from '../../graphql/queries';
import {
  GET_SHARED_COOKBOOKS_VARIABLES,
  GET_USER_COOKBOOKS_VARIABLES,
  GET_USER_SUBSCRIBED_COOKBOOKS_VARIABLES,
} from '../../graphql/variables';
import Favorite, { FavoriteProps } from './Favorite';

type FavoriteCookbookProps = Pick<FavoriteProps, 'isSubscribed'> & {
  cookbookId: number;
};

const cookbookRefetches = [
  {
    query: GET_USER_COOKBOOKS,
    variables: GET_USER_COOKBOOKS_VARIABLES,
  },
  {
    query: GET_USER_SUBSCRIBED_COOKBOOKS,
    variables: GET_USER_SUBSCRIBED_COOKBOOKS_VARIABLES,
  },
  {
    query: GET_SHARED_COOKBOOKS,
    variables: GET_SHARED_COOKBOOKS_VARIABLES,
  },
];

export default function FavoriteCookbook({
  isSubscribed,
  cookbookId,
}: FavoriteCookbookProps) {
  const toast = useToast();

  const [favoriteCookbook] = useMutation(SUBSCRIBE_TO_COOKBOOK);
  const [unfavoriteCookbook] = useMutation(UNSUBSCRIBE_TO_COOKBOOK);

  const onFavoriteCookbook = async () => {
    try {
      await favoriteCookbook({
        variables: {
          id: cookbookId,
        },
        awaitRefetchQueries: true,
        refetchQueries: cookbookRefetches,
      });
    } catch (err) {
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
        awaitRefetchQueries: true,
        refetchQueries: cookbookRefetches,
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
      onSubscribe={onFavoriteCookbook}
      onUnsubscribe={onUnfavoriteCookbook}
    />
  );
}
