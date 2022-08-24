import { useQuery } from '@apollo/client';
import { useFilters } from 'renderer/components/FiltersContext';
import SearchResults from 'renderer/components/SearchResults';
import SearchResultsEmpty from 'renderer/components/SearchResults/SearchResultsEmpty';
import SearchResultsError from 'renderer/components/SearchResults/SearchResultsError';
import SearchResultsLoading from 'renderer/components/SearchResults/SearchResultsLoading';
import {
  GetRecipesSemanticallyData,
  GetRecipesSemanticallyVariables,
  GET_RECIPES_SEMANTICALLY,
} from 'renderer/graphql/queries';
import { Language } from 'renderer/lib/constants';

export default function Home() {
  const filters = useFilters();

  const { data, loading, error } = useQuery<
    GetRecipesSemanticallyData,
    GetRecipesSemanticallyVariables
  >(GET_RECIPES_SEMANTICALLY, {
    variables: {
      howmany: 100,
      skip: 0,
      languages:
        filters.language !== Language.ALL_LANGUAGES ? [filters.language] : null,
      dependencies: filters.library ? [filters.library] : null,
      term: filters.searchTerm || null,
      tags: filters.tags ? [filters.tags] : null,
      onlyPrivate: filters.privacy === 'private' ? true : null,
      onlyPublic: filters.privacy === 'public' ? true : null,
      onlySubscribed: filters.isSubscribed || null,
    },
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
