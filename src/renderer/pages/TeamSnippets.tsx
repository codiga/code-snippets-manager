import { useQuery } from '@apollo/client';
import { GET_SHARED_RECIPES } from '../graphql/queries';
import { AssistantRecipeWithStats } from '../types/assistantTypes';
import SnippetTableLoading from '../components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../components/SnippetTable/SnippetTableEmpty';
import SnippetTableEmptyFiltered from '../components/SnippetTable/SnippetTableEmptyFiltered';
import SnippetTable from '../components/SnippetTable/SnippetTable';
import filterBy from '../components/Filters/filterBy';
import { useFilters } from '../components/FiltersContext';
import useQueryVariables from '../hooks/useQueryVariables';

export default function TeamSnippets() {
  const filters = useFilters();
  const variables = useQueryVariables('team-snippets');

  const { data, loading, error } = useQuery<{
    recipes: AssistantRecipeWithStats[];
  }>(GET_SHARED_RECIPES, {
    variables,
    context: {
      debounceKey: 'team-snippets',
    },
  });

  const teamRecipes = data?.recipes || [];

  // check the recipe against the search filters
  const filteredRecipes = teamRecipes.filter((recipe) => {
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

  return <SnippetTable page="team" recipes={filteredRecipes} />;
}
