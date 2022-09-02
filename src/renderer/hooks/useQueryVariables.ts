import { useUser } from '../components/UserContext';
import {
  GET_USER_RECIPES_VARIABLES,
  GET_USER_SUBSCRIBED_RECIPES_VARIABLES,
  GET_SHARED_RECIPES_VARIABLES,
  GET_USER_COOKBOOKS_VARIABLES,
  GET_USER_SUBSCRIBED_COOKBOOKS_VARIABLES,
  GET_SHARED_COOKBOOKS_VARIABLES,
} from '../graphql/variables';
import { Language } from '../lib/constants';
import { LanguageEnumeration } from '../types/assistantTypes';
import { useFilters } from '../components/FiltersContext';

type QueryTypes =
  | 'home'
  | 'my-snippets'
  | 'favorite-snippets'
  | 'team-snippets'
  | 'my-cookbooks'
  | 'favorite-cookbooks'
  | 'team-cookbooks';

export default function useQueryVariables(query: QueryTypes) {
  const filters = useFilters();
  const { id: userId } = useUser();

  switch (query) {
    case 'home':
      return {
        howmany: 100,
        skip: 0,
        languages:
          filters.language && filters.language !== Language.ALL_LANGUAGES
            ? ([filters.language] as LanguageEnumeration[])
            : null,
        dependencies: filters.library ? [filters.library] : null,
        term: filters.searchTerm || null,
        tags: filters.tags ? [filters.tags] : null,
        onlyPrivate: filters.privacy === 'private' && !!userId ? true : null,
        onlyPublic: filters.privacy === 'public' && !!userId ? true : null,
        onlySubscribed: userId ? filters.isSubscribed || null : null,
      };

    case 'my-snippets':
      return {
        ...GET_USER_RECIPES_VARIABLES,
        name: filters.searchTerm || null,
        language:
          filters.language && filters.language !== Language.ALL_LANGUAGES
            ? filters.language
            : null,
        tag: filters.tags || null,
      };

    case 'favorite-snippets':
      return {
        ...GET_USER_SUBSCRIBED_RECIPES_VARIABLES,
        name: filters.searchTerm || null,
      };

    case 'team-snippets':
      return {
        ...GET_SHARED_RECIPES_VARIABLES,
        name: filters.searchTerm || null,
        languages:
          filters.language && filters.language !== Language.ALL_LANGUAGES
            ? [filters.language]
            : null,
        tag: filters.tags || null,
      };

    case 'my-cookbooks':
      return {
        ...GET_USER_COOKBOOKS_VARIABLES,
        name: filters.searchTerm || null,
      };

    case 'favorite-cookbooks':
      return {
        ...GET_USER_SUBSCRIBED_COOKBOOKS_VARIABLES,
        name: filters.searchTerm || null,
      };

    case 'team-cookbooks':
      return {
        ...GET_SHARED_COOKBOOKS_VARIABLES,
        name: filters.searchTerm || null,
      };

    default:
      return {};
  }
}
