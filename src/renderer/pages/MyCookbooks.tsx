import { useQuery } from '@apollo/client';
import { GET_USER_COOKBOOKS_VARIABLES } from 'renderer/graphql/variables';
import { GET_USER_COOKBOOKS } from 'renderer/graphql/queries';
import { AssistantCookbook } from 'renderer/types/assistantTypes';
import CookbookTableLoading from 'renderer/components/CookbookTable/CookbookTableLoading';
import CookbookTableError from 'renderer/components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from 'renderer/components/CookbookTable/CookbookTableEmpty';
import CookbookTableEmptyFiltereed from 'renderer/components/CookbookTable/CookbookTableEmptyFiltered';
import CookbookTable from 'renderer/components/CookbookTable/CookbookTable';
import { useFilters } from 'renderer/components/FiltersContext';
import filterBy from 'renderer/components/Filters/filterBy';

export default function MyCookbooks() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<{
    user: { cookbooks: AssistantCookbook[] };
  }>(GET_USER_COOKBOOKS, {
    variables: GET_USER_COOKBOOKS_VARIABLES,
  });

  const userCookbooks = data?.user?.cookbooks || [];

  // check the recipe against the search filters
  const filteredCookbooks = userCookbooks.filter((cookbook) => {
    if (!filterBy.name(filters, cookbook.name)) return false;
    // if (!filterBy.language(filters, cookbook.language)) return false;
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

  return <CookbookTable page="my" cookbooks={filteredCookbooks} />;
}
