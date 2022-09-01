import { useQuery } from '@apollo/client';
import { GET_SHARED_COOKBOOKS } from '../graphql/queries';
import { AssistantCookbook } from '../types/assistantTypes';
import CookbookTableLoading from '../components/CookbookTable/CookbookTableLoading';
import CookbookTableError from '../components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from '../components/CookbookTable/CookbookTableEmpty';
import CookbookTableEmptyFiltered from '../components/CookbookTable/CookbookTableEmptyFiltered';
import CookbookTable from '../components/CookbookTable/CookbookTable';
import { useFilters } from '../components/FiltersContext';
import filterBy from '../components/Filters/filterBy';
import useQueryVariables from '../hooks/useQueryVariables';

export default function TeamCookbooks() {
  const filters = useFilters();
  const variables = useQueryVariables('team-cookbooks');

  const { data, loading, error } = useQuery<{
    cookbooks: AssistantCookbook[];
  }>(GET_SHARED_COOKBOOKS, {
    variables,
    context: {
      debounceKey: 'team-cookbooks',
    },
  });

  const userCookbooks = data?.cookbooks || [];

  // check the recipe against the search filters
  const filteredCookbooks = userCookbooks.filter((cookbook) => {
    if (!filterBy.name(filters, cookbook.name)) return false;
    if (!filterBy.privacy(filters, cookbook.isPublic)) return false;
    if (!filterBy.isSubscribed(filters, cookbook.isSubscribed)) return false;
    return true;
  });

  if (error) {
    return <CookbookTableError />;
  }

  if (loading) {
    return <CookbookTableLoading />;
  }

  if (filteredCookbooks.length === 0 && !filters.isEmpty) {
    return <CookbookTableEmptyFiltered />;
  }

  if (filteredCookbooks.length === 0) {
    return <CookbookTableEmpty />;
  }

  return <CookbookTable page="team" cookbooks={filteredCookbooks} />;
}
