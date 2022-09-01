import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../graphql/queries';
import { GET_USER_RECIPES_VARIABLES } from '../graphql/variables';
import { AssistantRecipeWithStats } from '../types/assistantTypes';
import SnippetTableLoading from '../components/SnippetTable/SnippetTableLoading';
import SnippetTableError from '../components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from '../components/SnippetTable/SnippetTableEmpty';
import SnippetTable from '../components/SnippetTable/SnippetTable';
import { useFilters } from '../components/FiltersContext';
import filterBy from '../components/Filters/filterBy';
import SnippetTableEmptyFiltered from '../components/SnippetTable/SnippetTableEmptyFiltered';
import { Language } from '../lib/constants';

export default function MySnippets() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_RECIPES, {
    variables: {
      ...GET_USER_RECIPES_VARIABLES,
      name: filters.searchTerm,
      language:
        filters.language && filters.language !== Language.ALL_LANGUAGES
          ? filters.language
          : null,
      tag: filters.tags || null,
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
