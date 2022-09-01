import { useQuery } from '@apollo/client';
import useQueryVariables from '../hooks/useQueryVariables';
import { useFilters } from '../components/FiltersContext';
import SearchResults from '../components/SearchResults';
import SearchResultsEmpty from '../components/SearchResults/SearchResultsEmpty';
import SearchResultsError from '../components/SearchResults/SearchResultsError';
import SearchResultsLoading from '../components/SearchResults/SearchResultsLoading';
import {
  GetRecipesSemanticallyData,
  GetRecipesSemanticallyVariables,
  GET_RECIPES_SEMANTICALLY,
} from '../graphql/queries';

export default function Home() {
  const filters = useFilters();
  const variables = useQueryVariables('home');

  const { data, loading, error } = useQuery<
    GetRecipesSemanticallyData,
    GetRecipesSemanticallyVariables
  >(GET_RECIPES_SEMANTICALLY, {
    variables: variables as GetRecipesSemanticallyVariables,
    context: {
      debounceKey: 'search',
    },
  });

  const results = data?.searchResults || [];

  if (error) {
    return <SearchResultsError />;
  }

  if (loading) {
    return <SearchResultsLoading />;
  }

  if (results.length === 0) {
    return <SearchResultsEmpty />;
  }

  return <SearchResults results={results} />;
}
