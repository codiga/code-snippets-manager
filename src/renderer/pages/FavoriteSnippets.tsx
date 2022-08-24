import { useQuery } from '@apollo/client';
import { GET_USER_SUBSCRIBED_RECIPES } from '../../renderer/graphql/queries';
import { GET_USER_SUBSCRIBED_RECIPES_VARIABLES } from '../../renderer/graphql/variables';
import { AssistantRecipeWithStats } from '../../renderer/types/assistantTypes';
import SnippetTableLoading from '../../renderer/components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../../renderer/components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../../renderer/components/SnippetTable/SnippetTableEmpty';
import SnippetTableEmptyFiltered from '../../renderer/components/SnippetTable/SnippetTableEmptyFiltered';
import SnippetTable from '../../renderer/components/SnippetTable/SnippetTable';
import filterBy from '../../renderer/components/Filters/filterBy';
import { useFilters } from '../../renderer/components/FiltersContext';

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
