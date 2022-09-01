import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../../lib/constants';
import {
  LanguageEnumeration,
  LibraryEnumeration,
} from '../../types/assistantTypes';

export type SearchTermType = string;
export type LanguageType = LanguageEnumeration;
export type LibraryType = LibraryEnumeration | null;
export type TagsType = string;
export type PrivacyType = 'all' | 'public' | 'private';
export type IsSubscribedType = boolean;

export type FilterTypes = {
  searchTerm: SearchTermType;
  language: LanguageType;
  library: LibraryType;
  tags: TagsType;
  privacy: PrivacyType;
  isSubscribed: IsSubscribedType;
};

type FiltersContextType = FilterTypes & {
  setSearchTerm: React.Dispatch<React.SetStateAction<SearchTermType>>;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
  setLibrary: React.Dispatch<React.SetStateAction<LibraryType>>;
  setTags: React.Dispatch<React.SetStateAction<TagsType>>;
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyType>>;
  setIsSubscribed: React.Dispatch<React.SetStateAction<IsSubscribedType>>;
  resetAllFilters: () => void;
  isEmpty: boolean;
};

const FiltersContext = createContext({} as FiltersContextType);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<LanguageEnumeration>(
    Language.ALL_LANGUAGES
  );
  const [library, setLibrary] = useState<LibraryEnumeration | null>(null);
  const [tags, setTags] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyType>('all');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // check if all the filters are empty
  const isEmpty =
    !searchTerm &&
    language === Language.ALL_LANGUAGES &&
    !library &&
    !tags &&
    privacy === 'all' &&
    isSubscribed === false;

  const resetAllFilters = () => {
    setSearchTerm('');
    setLanguage(Language.ALL_LANGUAGES);
    setLibrary(null);
    setTags('');
    setPrivacy('all');
    setIsSubscribed(false);
  };

  const filtersContext = {
    searchTerm,
    setSearchTerm,
    language,
    setLanguage,
    library,
    setLibrary,
    tags,
    setTags,
    privacy,
    setPrivacy,
    isSubscribed,
    setIsSubscribed,
    resetAllFilters,
    isEmpty,
  };

  return (
    <FiltersContext.Provider value={filtersContext}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
