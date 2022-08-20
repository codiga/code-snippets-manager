import { useQuery } from '@apollo/client';
import { GET_SHARED_COOKBOOKS } from 'renderer/graphql/queries';
import { GET_SHARED_COOKBOOKS_VARIABLES } from 'renderer/graphql/variables';
import { AssistantCookbook } from 'renderer/types/assistantTypes';
import CookbookTableLoading from 'renderer/components/CookbookTable/CookbookTableLoading';
import CookbookTableError from 'renderer/components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from 'renderer/components/CookbookTable/CookbookTableEmpty';
import CookbookTable from 'renderer/components/CookbookTable/CookbookTable';

export default function TeamCookbooks() {
  const { data, loading, error } = useQuery<{
    cookbooks: AssistantCookbook[];
  }>(GET_SHARED_COOKBOOKS, {
    variables: GET_SHARED_COOKBOOKS_VARIABLES,
  });

  const userCookbooks = data?.cookbooks || [];

  if (error) {
    return <CookbookTableError />;
  }

  if (loading) {
    return <CookbookTableLoading />;
  }

  if (userCookbooks.length === 0) {
    return <CookbookTableEmpty />;
  }

  return <CookbookTable cookbooks={userCookbooks} />;
}
