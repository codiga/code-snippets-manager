import { useQuery } from '@apollo/client';
import { GET_USER_SUBSCRIBED_RECIPES } from '../graphql/queries';
import { GET_USER_SUBSCRIBED_RECIPES_VARIABLES } from '../graphql/variables';
import { AssistantRecipeWithStats } from '../types/assistantTypes';
import SnippetTableLoading from '../components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../components/SnippetTable/SnippetTableEmpty';
import SnippetTableEmptyFiltered from '../components/SnippetTable/SnippetTableEmptyFiltered';
import SnippetTable from '../components/SnippetTable/SnippetTable';
import filterBy from '../components/Filters/filterBy';
import { useFilters } from '../components/FiltersContext';

export default function MySnippets() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_SUBSCRIBED_RECIPES, {
    variables: {
      ...GET_USER_SUBSCRIBED_RECIPES_VARIABLES,
      name: filters.searchTerm,
    },
    context: {
      debounceKey: 'favorite-snippets',
    },
  });

  const userFavoriteRecipes = data?.user?.recipes || [];

  // check the recipe against the search filters
  const filteredRecipes = userFavoriteRecipes.filter((recipe) => {
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

  if (userFavoriteRecipes.length === 0) {
    return <SnippetTableEmpty />;
  }

  if (filteredRecipes.length === 0) {
    return <SnippetTableEmptyFiltered />;
  }

  return <SnippetTable page="favorite" recipes={filteredRecipes} />;
}
