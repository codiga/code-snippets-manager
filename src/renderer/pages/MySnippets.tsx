import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../graphql/queries';
import { AssistantRecipeWithStats } from '../types/assistantTypes';
import SnippetTableLoading from '../components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../components/SnippetTable/SnippetTableEmpty';
import SnippetTableEmptyFiltered from '../components/SnippetTable/SnippetTableEmptyFiltered';
import SnippetTable from '../components/SnippetTable/SnippetTable';
import { useFilters } from '../components/FiltersContext';
import useQueryVariables from '../hooks/useQueryVariables';
import { PAGE_QUERY_POLL_INTERVAL_IN_MS } from '../lib/constants';

export default function MySnippets() {
  const filters = useFilters();
  const variables = useQueryVariables('my-snippets');

  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_RECIPES, {
    variables,
    pollInterval: PAGE_QUERY_POLL_INTERVAL_IN_MS,
    context: {
      debounceKey: 'my-snippets',
    },
  });

  const userRecipes = data?.user?.recipes || [];

  if (error) {
    return <SnippetTableError />;
  }

  if (loading) {
    return <SnippetTableLoading />;
  }

  if (userRecipes.length === 0 && !filters.isEmpty) {
    return <SnippetTableEmptyFiltered />;
  }

  if (userRecipes.length === 0) {
    return <SnippetTableEmpty />;
  }

  return <SnippetTable recipes={userRecipes} />;
}
