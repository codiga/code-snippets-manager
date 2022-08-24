import { useQuery } from '@apollo/client';
import { GET_SHARED_COOKBOOKS } from '../graphql/queries';
import { GET_SHARED_COOKBOOKS_VARIABLES } from '../graphql/variables';
import { AssistantCookbook } from '../types/assistantTypes';
import CookbookTableLoading from '../components/CookbookTable/CookbookTableLoading';
import CookbookTableError from '../components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from '../components/CookbookTable/CookbookTableEmpty';
import CookbookTableEmptyFiltereed from '../components/CookbookTable/CookbookTableEmptyFiltered';
import CookbookTable from '../components/CookbookTable/CookbookTable';
import { useFilters } from '../components/FiltersContext';
import filterBy from '../components/Filters/filterBy';

export default function TeamCookbooks() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<{
    cookbooks: AssistantCookbook[];
  }>(GET_SHARED_COOKBOOKS, {
    variables: {
      ...GET_SHARED_COOKBOOKS_VARIABLES,
      name: filters.searchTerm,
    },
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

  if (userCookbooks.length === 0) {
    return <CookbookTableEmpty />;
  }

  if (filteredCookbooks.length === 0) {
    return <CookbookTableEmptyFiltereed />;
  }

  return <CookbookTable page="team" cookbooks={filteredCookbooks} />;
}
