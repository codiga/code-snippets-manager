import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from 'renderer/graphql/queries';
import { GET_USER_RECIPES_VARIABLES } from 'renderer/graphql/variables';
import { AssistantRecipeWithStats } from 'renderer/types/assistantTypes';
import SnippetTableLoading from 'renderer/components/SnippetTable/SnippetTableLoading';
import SnippetTableError from 'renderer/components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from 'renderer/components/SnippetTable/SnippetTableEmpty';
import SnippetTable from 'renderer/components/SnippetTable/SnippetTable';
import { useFilters } from 'renderer/components/FiltersContext';
import filterBy from 'renderer/components/Filters/filterBy';
import SnippetTableEmptyFiltered from 'renderer/components/SnippetTable/SnippetTableEmptyFiltered';
import { Language } from 'renderer/lib/constants';

export default function MySnippets() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_RECIPES, {
    variables: {
      ...GET_USER_RECIPES_VARIABLES,
      name: filters.searchTerm,
      language:
        filters.language !== Language.ALL_LANGUAGES ? filters.language : null,
      tag: filters.tags,
    },
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

  if (userRecipes.length === 0) {
    return <SnippetTableEmpty />;
  }

  if (filteredRecipes.length === 0) {
    return <SnippetTableEmptyFiltered />;
  }

  return <SnippetTable page="my" recipes={filteredRecipes} />;
}
