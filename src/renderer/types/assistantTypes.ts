// import { VotesType } from 'components/hub/votes/Votes.schema';
import {
  AllLibraries,
  CookBookSortingFields,
  Language,
  Library,
  RecipeSortingFields,
} from '../lib/constants';
import { Group } from './groupTypes';
import { PublicUser } from './userTypes';

export type AssistantRecipeQueryOrderBy =
  | RecipeSortingFields.Name
  | RecipeSortingFields.Timestamp
  | RecipeSortingFields.Visibility
  | RecipeSortingFields.Privacy
  | RecipeSortingFields.Rating
  | RecipeSortingFields.Uses
  | RecipeSortingFields.Cookbook;

export type AssistantCookbookQueryOrderBy =
  | CookBookSortingFields.Name
  | CookBookSortingFields.Timestamp;

export interface AssistantRecipeDependencyConstraint {
  name?: LibraryEnumeration;
  isNegative?: boolean;
  minVersion?: string;
  maxVersion?: string;
}

export interface AssistantRecipeComment {
  id?: number;
  creationTimestampMs?: number;
  rating?: number;
  comment?: string;
  securityFlag?: boolean;
  author?: PublicUser;
  upvotes?: number;
  downvotes?: number;
}

export interface AssistantCookbook {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  creationTimestampMs: number;
  owner: PublicUser;
  isSubscribed: boolean;
  recipes: AssistantRecipeWithStats[];
  recipesCount: number;
  groups?: Group[];
  languages?: LanguageEnumeration[];
  upvotes?: number;
  downvotes?: number;
}

export interface AssistantCookbookWithRecipeSummary {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  creationTimestampMs: number;
  owner: PublicUser;
  isSubscribed: boolean;
  recipes: RecipeSummary[];
  recipesCount: number;
  groups?: Group[];
}

export interface AssistantRecipeWithStats {
  id: number;
  name?: string;
  description?: string;
  isPublic?: boolean;
  filenamePatterns?: string[];
  keywords?: string[];
  tags?: string[];
  code?: string;
  presentableFormat?: string;
  imports?: string[];
  vscodeFormat?: string;
  jetbrainsFormat?: string;
  neovimFormat?: string;
  language?: LanguageEnumeration;
  creationTimestampMs?: number;
  owner?: PublicUser;
  uses?: number;
  averageRating?: number;
  shortcut?: string;
  dependencyConstraints?: AssistantRecipeDependencyConstraint[];
  isSubscribed?: boolean;
  comments?: AssistantRecipeComment[];
  commentsCount?: number;
  cookbook?: AssistantCookbook;
  upvotes?: number;
  downvotes?: number;
  groups?: { id: number; name: string }[];
}

export interface AssistantRecipesCountPerLanguage {
  language?: LanguageEnumeration;
  count?: number;
}

export enum RecipesMode {
  PUBLIC_MODE = 'PUBLIC_MODE',
  PRIVATE_MODE = 'PRIVATE_MODE',
  SUBSCRIPTION_MODE = 'SUBSCRIPTION_MODE',
  MODE_REC_CREATED = 'RECENTLY_CREATED',
  MODE_POP_RECIPES = 'POPULAR_RECIPES',
  MODE_USED_RECIPES = 'USED_RECIPES',
  MODE_ALL_RECIPES = 'ALL_RECIPES',
  MODE_SHARED = 'SHARED_MODE',
}

export enum CookbooksMode {
  PUBLIC_MODE = 'PUBLIC_MODE',
  PRIVATE_MODE = 'PRIVATE_MODE',
  SUBSCRIPTION_MODE = 'SUBSCRIPTION_MODE',
  MODE_REC_CREATED = 'RECENTLY_CREATED',
  MODE_POP_COOKBOOKS = 'POPULAR_COOKBOOKS',
  MODE_USED_COOKBOOKS = 'USED_COOKBOOKS',
  MODE_ALL_COOKBOOKS = 'ALL_COOKBOOKS',
  MODE_SHARED = 'SHARED_MODE',
}

export type LanguageEnumeration =
  | Language.LANGUAGE_UNKNOWN
  | Language.LANGUAGE_VISUAL
  | Language.LANGUAGE_DOCKER
  | Language.LANGUAGE_OBJECTIVE_C
  | Language.LANGUAGE_COLDFUSION
  | Language.LANGUAGE_TERRAFORM
  | Language.LANGUAGE_JSON
  | Language.LANGUAGE_YAML
  | Language.LANGUAGE_TYPESCRIPT
  | Language.LANGUAGE_SWIFT
  | Language.LANGUAGE_SOLIDITY
  | Language.LANGUAGE_SQL
  | Language.LANGUAGE_SHELL
  | Language.LANGUAGE_SCALA
  | Language.LANGUAGE_RUST
  | Language.LANGUAGE_RUBY
  | Language.LANGUAGE_PHP
  | Language.LANGUAGE_PYTHON
  | Language.LANGUAGE_PERL
  | Language.LANGUAGE_KOTLIN
  | Language.LANGUAGE_JAVASCRIPT
  | Language.LANGUAGE_JAVA
  | Language.LANGUAGE_HTML
  | Language.LANGUAGE_HASKELL
  | Language.LANGUAGE_GO
  | Language.LANGUAGE_DART
  | Language.LANGUAGE_CSHARP
  | Language.LANGUAGE_CSS
  | Language.LANGUAGE_CPP
  | Language.LANGUAGE_PASCAL
  | Language.LANGUAGE_REACT
  | Language.LANGUAGE_C
  | Language.LANGUAGE_APEX
  | Language.ALL_LANGUAGES;

export type LibraryEnumeration =
  | Library.REACT
  | Library.VUE
  | Library.ANGULAR
  | Library.DJANGO
  | Library.NEXTJS
  | Library.REMIX
  | Library.REQUESTS
  | Library.FLASK
  | Library.NUMPY
  | Library.BOTO3
  | Library.CHAKRA
  | Library.RAILS
  | Library.JEST
  | Library.EXPRESS
  | Library.APOLLO
  | Library.GRAPHQL
  | Library.PYTORCH
  | Library.TENSORFLOW
  | Library.MYSQLCONNECTOR
  | Library.REACTNATIVE;

export type LibraryWithAllEnumeration =
  | LibraryEnumeration
  | AllLibraries.ALL_LIBRARIES;

export type RecipeVariableType = {
  text: string;
  displayText: string;
};

export type RecipeSummary = Pick<
  AssistantRecipeWithStats,
  | 'id'
  | 'name'
  | 'tags'
  | 'uses'
  | 'language'
  | 'averageRating'
  | 'keywords'
  | 'dependencyConstraints'
>;
// > &
// Pick<VotesType, 'upvotes' | 'downvotes'>;

export type RecipesSemanticSearchView = 'list' | 'cards';

export function isLanguageEnumeration(
  value: string | undefined
): value is LanguageEnumeration {
  return Object.values(Language).includes(value as LanguageEnumeration);
}

export function isLibraryWithAllEnumeration(
  value: string | undefined
): value is LibraryWithAllEnumeration {
  const all = { ...Library, ...AllLibraries };
  return Object.values(all).includes(value as LibraryWithAllEnumeration);
}

export function isRecipesSemanticSearchView(
  value: string | undefined
): value is RecipesSemanticSearchView {
  return value === 'list' || value === 'cards';
}
