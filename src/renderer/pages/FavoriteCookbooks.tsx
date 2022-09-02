import { useQuery } from '@apollo/client';
import { GET_USER_SUBSCRIBED_COOKBOOKS } from '../graphql/queries';
import { AssistantCookbook } from '../types/assistantTypes';
import CookbookTableLoading from '../components/CookbookTable/CookbookTableLoading';
import CookbookTableError from '../components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from '../components/CookbookTable/CookbookTableEmpty';
import CookbookTableEmptyFiltered from '../components/CookbookTable/CookbookTableEmptyFiltered';
import CookbookTable from '../components/CookbookTable/CookbookTable';
import { useFilters } from '../components/FiltersContext';
import useQueryVariables from '../hooks/useQueryVariables';
import { PAGE_QUERY_POLL_INTERVAL_IN_MS } from '../lib/constants';

export default function FavoriteCookbooks() {
  const filters = useFilters();
  const variables = useQueryVariables('favorite-cookbooks');

  const { data, loading, error } = useQuery<{
    user: { cookbooks: AssistantCookbook[] };
  }>(GET_USER_SUBSCRIBED_COOKBOOKS, {
    variables,
    pollInterval: PAGE_QUERY_POLL_INTERVAL_IN_MS,
    context: {
      debounceKey: 'favorite-cookbooks',
    },
  });

  const userCookbooks = data?.user?.cookbooks || [];

  if (error) {
    return <CookbookTableError />;
  }

  if (loading) {
    return <CookbookTableLoading />;
  }

  if (userCookbooks.length === 0 && !filters.isEmpty) {
    return <CookbookTableEmptyFiltered />;
  }

  if (userCookbooks.length === 0) {
    return <CookbookTableEmpty />;
  }

  return <CookbookTable cookbooks={userCookbooks} />;
}
