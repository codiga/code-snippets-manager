import { useQuery } from '@apollo/client';
import { GET_SHARED_RECIPES } from 'renderer/graphql/queries';
import { GET_SHARED_RECIPES_VARIABLES } from 'renderer/graphql/variables';
import { AssistantRecipeWithStats } from 'renderer/types/assistantTypes';
import SnippetTableLoading from 'renderer/components/SnippetTable/SnippetTableLoading';
import SnippetTableError from 'renderer/components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from 'renderer/components/SnippetTable/SnippetTableEmpty';
import SnippetTable from 'renderer/components/SnippetTable/SnippetTable';

export default function TeamSnippets() {
  const { data, loading, error } = useQuery<{
    recipes: AssistantRecipeWithStats[];
  }>(GET_SHARED_RECIPES, {
    variables: GET_SHARED_RECIPES_VARIABLES,
  });

  const teamSnippets = data?.recipes || [];

  if (error) {
    return <SnippetTableError />;
  }

  if (loading) {
    return <SnippetTableLoading />;
  }

  if (teamSnippets.length === 0) {
    return <SnippetTableEmpty />;
  }
  return <SnippetTable recipes={teamSnippets} />;
}
