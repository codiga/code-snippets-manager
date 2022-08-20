import { useQuery } from '@apollo/client';
import { GET_USER_COOKBOOKS_VARIABLES } from 'renderer/graphql/variables';
import { GET_USER_COOKBOOKS } from 'renderer/graphql/queries';
import { AssistantCookbook } from 'renderer/types/assistantTypes';
import CookbookTableLoading from 'renderer/components/CookbookTable/CookbookTableLoading';
import CookbookTableError from 'renderer/components/CookbookTable/CookbookTableError';
import CookbookTableEmpty from 'renderer/components/CookbookTable/CookbookTableEmpty';
import CookbookTable from 'renderer/components/CookbookTable/CookbookTable';

export default function MyCookbooks() {
  const { data, loading, error } = useQuery<{
    user: { cookbooks: AssistantCookbook[] };
  }>(GET_USER_COOKBOOKS, {
    variables: GET_USER_COOKBOOKS_VARIABLES,
  });

  const userCookbooks = data?.user?.cookbooks || [];

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
