import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../graphql/queries';
import { AssistantRecipeWithStats } from '../types/assistantTypes';
import SnippetTableLoading from '../components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../components/SnippetTable/SnippetTableEmpty';
import SnippetTableEmptyFiltered from '../components/SnippetTable/SnippetTableEmptyFiltered';
import SnippetTable from '../components/SnippetTable/SnippetTable';
import { useFilters } from '../components/FiltersContext';
import filterBy from '../components/Filters/filterBy';
import useQueryVariables from '../hooks/useQueryVariables';

export default function MySnippets() {
  const filters = useFilters();
  const variables = useQueryVariables('my-snippets');

  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_RECIPES, {
    variables,
    context: {
      debounceKey: 'my-snippets',
    },
  });

  const userRecipes = data?.user?.recipes || [];

  // check the recipe against the search filters
  const filteredRecipes = userRecipes.filter((recipe) => {
    if (!filterBy.name(filters, recipe.name)) return false;
    if (!filterBy.language(filters, recipe.language)) return false;
    if (!filterBy.library(filters, recipe.dependencyConstraints)) return false;
    if (!filterBy.tags(filters, recipe.tags)) return false;
    if (!filterBy.privacy(filters, recipe.isPublic)) return false;
    if (!filterBy.isSubscribed(filters, recipe.isSubscribed)) return false;
    return true;
  });

  if (error) {
    return <SnippetTableError />;
  }

  if (loading) {
    return <SnippetTableLoading />;
  }

  if (filteredRecipes.length === 0 && !filters.isEmpty) {
    return <SnippetTableEmptyFiltered />;
  }

  if (filteredRecipes.length === 0) {
    return <SnippetTableEmpty />;
  }

  return <SnippetTable page="my" recipes={filteredRecipes} />;
}
