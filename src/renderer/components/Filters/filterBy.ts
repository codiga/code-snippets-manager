import { FilterTypes } from '../FiltersContext';
import { Language } from '../../lib/constants';
import { AssistantRecipeDependencyConstraint } from '../../types/assistantTypes';

const filterByName = (
  filters: FilterTypes,
  name?: FilterTypes['searchTerm']
) => {
  if (!name || !filters.searchTerm) return true;
  if (name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
    return true;
  }
  return false;
};

const filterByLanguage = (
  filters: FilterTypes,
  language?: FilterTypes['language']
) => {
  if (!language || !filters.language) return true;
  if (filters.language === Language.ALL_LANGUAGES) return true;
  if (language.toLowerCase() === filters.language.toLowerCase()) {
    return true;
  }
  return false;
};

const filterByLibrary = (
  filters: FilterTypes,
  dependencyConstraints?: AssistantRecipeDependencyConstraint[]
) => {
  if (
    !dependencyConstraints ||
    dependencyConstraints.length === 0 ||
    !filters.library
  ) {
    return true;
  }
  const lowerLibrarySearch = filters.library?.toLowerCase() || '';
  if (
    dependencyConstraints.some(
      (dependencyConstraint) =>
        dependencyConstraint.name?.toLowerCase() === lowerLibrarySearch
    )
  ) {
    return true;
  }
  return false;
};

const filterByTags = (filters: FilterTypes, tags?: string[]) => {
  if (!tags || tags.length === 0 || !filters.tags) return true;
  if (tags.some((tag) => tag.includes(filters.tags))) return true;
  return false;
};

const filterByPrivacy = (filters: FilterTypes, isPublic?: boolean) => {
  if (filters.privacy === 'all') return true;
  if (filters.privacy === 'public' && isPublic) return true;
  if (filters.privacy === 'private' && !isPublic) return true;
  return false;
};

const filterByIsSubscribed = (filters: FilterTypes, isSubscribed?: boolean) => {
  if (!filters.isSubscribed) return true;
  if (isSubscribed) return true;
  return false;
};

export default {
  name: filterByName,
  language: filterByLanguage,
  library: filterByLibrary,
  tags: filterByTags,
  privacy: filterByPrivacy,
  isSubscribed: filterByIsSubscribed,
};
