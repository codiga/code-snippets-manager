import { useQuery } from '@apollo/client';
import useQueryVariables from '../hooks/useQueryVariables';
import SearchResultsEmpty from '../components/SearchResults/SearchResultsEmpty';
import SearchResultsError from '../components/SearchResults/SearchResultsError';
import SnippetResults from '../components/SnippetResults/SnippetResults';
import SnippetResultsLoading from '../components/SnippetResults/SnippetResultsLoading';
import {
  GetRecipesSemanticallyData,
  GetRecipesSemanticallyVariables,
  GET_RECIPES_SEMANTICALLY,
} from '../graphql/queries';
import { PAGE_QUERY_POLL_INTERVAL_IN_MS } from '../lib/constants';

export default function Home() {
  const variables = useQueryVariables('home');

  const { data, loading, error } = useQuery<
    GetRecipesSemanticallyData,
    GetRecipesSemanticallyVariables
  >(GET_RECIPES_SEMANTICALLY, {
    variables: variables as GetRecipesSemanticallyVariables,
    pollInterval: PAGE_QUERY_POLL_INTERVAL_IN_MS,
    context: {
      debounceKey: 'search',
    },
  });

  const results = data?.searchResults || [];

  if (error) {
    return <SearchResultsError />;
  }

  if (loading) {
    return <SnippetResultsLoading />;
  }

  if (results.length === 0) {
    return <SearchResultsEmpty />;
  }

  return <SnippetResults results={results} />;
}
