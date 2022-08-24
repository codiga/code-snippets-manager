import { AccountTypeEnum, UserPreferenceKey } from '../lib/constants';
import {
  AssistantCookbook,
  AssistantRecipesCountPerLanguage,
  AssistantRecipeWithStats,
} from './assistantTypes';
import { Project } from './projectTypes';

export type UserLevel =
  | 'Pro'
  | 'KpiViewer'
  | 'Admin'
  | 'Gold'
  | 'Silver'
  | 'Basic';

export type AccountType =
  | AccountTypeEnum.Unknown
  | AccountTypeEnum.Bitbucket
  | AccountTypeEnum.Gitlab
  | AccountTypeEnum.Github
  | AccountTypeEnum.Google
  | AccountTypeEnum.Regular;

export interface BitbucketInstallation {
  uuid?: string;
  baseUrl?: string;
  apiBaseUrl?: string;
}

export type SeniorityEnumeration =
  | 'VP'
  | 'CTO'
  | 'Staff'
  | 'Senior'
  | 'Mid'
  | 'Junior'
  | 'Student';

export interface UserInfo {
  firstname?: string;
  lastname?: string;
  address?: string;
  city?: string;
  country?: string;
  heardAbout?: string;
  state?: string;
  url?: string;
  zipcode?: string;
  company?: string;
  seniority?: SeniorityEnumeration;
}

export interface AssistantUserStatistics {
  totalNumberOfPublicRecipes?: number;
  averageUsageOfRecipes?: number;
  totalNumberOfCommentsInRecipes?: number;
}

export interface ApiToken {
  id?: number;
  value?: string;
  description?: string;
  creationTimestamp?: number;
}

export type UserPreferenceKeyType =
  | UserPreferenceKey.EnableGravatar
  | UserPreferenceKey.EnableAssistantWeeklySummary
  | UserPreferenceKey.EnableAssistantRecipeCommentNotification
  | UserPreferenceKey.UserWizardLaunched
  | UserPreferenceKey.CodingAssistantEnabled
  | UserPreferenceKey.EnablePublicProfile
  | UserPreferenceKey.Theme;

export interface UserPreference {
  key?: UserPreferenceKeyType;
  value?: string;
}

export type LinkedAccountKind = 'Bitbucket' | 'Gitlab' | 'Github' | 'Google';

export interface LinkedAccount {
  kind?: LinkedAccountKind;
  state?: string;
  externalIdentifier?: number;
  externalLogin?: string;
}

export interface UserSocials {
  socialLinkedin?: string;
  socialDevTo?: string;
  socialGitHub?: string;
  socialTwitter?: string;
  socialFacebook?: string;
}

export type UserSocialsKey = keyof UserSocials;

export interface User {
  id?: number;
  karma?: number;
  totalDownvotesReceived?: number;
  totalUpvotesReceived?: number;
  totalDownvotesGiven?: number;
  totalUpvotesGiven?: number;
  username?: string;
  accountType?: AccountType;
  description?: string;
  email?: string;
  level?: UserLevel;
  hasSlug?: boolean;
  slug?: string;
  creationDate?: string;
  ownedProjects?: Project[];
  numberOfOwnedProjects?: number;
  numberOfAuthoredRecipes?: number;
  info?: UserInfo;
  statistics?: AssistantUserStatistics;
  hasSubscription?: boolean;
  allowedNumberOfProjects?: number;
  remainingAnalysisQuota?: number;
  apiKey?: string;
  apiTokens?: ApiToken[];
  githubInstallationIdentifier?: number;
  bitbucketInstallation?: BitbucketInstallation;
  preferences?: UserPreference[];
  linkedAccounts?: LinkedAccount[];
  assistantRecipesSubscribed?: AssistantRecipeWithStats[];
  assistantRecipesSubscribedCount?: number;
  assistantCookbooksSubscribed?: AssistantCookbook[];
  assistantCookbooksSubscribedCount?: number;
  assistantRecipes?: AssistantRecipeWithStats[];
  assistantRecipesCount?: number;
  assistantRecipe?: AssistantRecipeWithStats;
  assistantCookbooks?: AssistantCookbook[];
  assistantCookbooksCount?: number;
  assistantCookbook?: AssistantCookbook;
  assistantPublicRecipesCountPerLanguage?: AssistantRecipesCountPerLanguage[];
}

export interface PublicUser {
  id?: number;
  karma?: number;
  hasSlug?: boolean;
  slug?: string;
  totalDownvotesReceived?: number;
  totalUpvotesReceived?: number;
  totalDownvotesGiven?: number;
  totalUpvotesGiven?: number;
  displayName?: string;
  accountType?: AccountType;
  description?: string;
  firstname?: string;
  lastname?: string;
  city?: string;
  country?: string;
  statistics?: AssistantUserStatistics;
  hasSubscription?: boolean;
  allowedNumberOfProjects?: number;
  remainingAnalysisQuota?: number;
  bitbucketInstallation?: BitbucketInstallation;
  preferences?: UserPreference[];
  linkedAccounts?: LinkedAccount[];
  assistantRecipesSubscribed?: AssistantRecipeWithStats[];
  assistantRecipesSubscribedCount?: number;
  assistantCookbooksSubscribed?: AssistantCookbook[];
  assistantCookbooksSubscribedCount?: number;
  assistantRecipes?: AssistantRecipeWithStats[];
  assistantRecipesCount?: number;
  assistantRecipe?: AssistantRecipeWithStats;
  assistantCookbooks?: AssistantCookbook[];
  assistantCookbooksCount?: number;
  assistantCookbook?: AssistantCookbook;
  assistantPublicRecipesCountPerLanguage?: AssistantRecipesCountPerLanguage[];
  socialLinkedin?: string;
  socialDevTo?: string;
  socialGitHub?: string;
  socialTwitter?: string;
  socialFacebook?: string;
}

export type ViolationsInformation = {
  count: number;
  average: number;
  security: number;
  documentation: number;
  errorProne: number;
  safety: number;
  bestPractices: number;
  codeStyle: number;
  design: number;
  performance: number;
  unknown: number;
};

export enum SeverityType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}
export type PublicUserStatisticsData = {
  assistantCommentsCount?: number;
  averageRecipesRating?: number;
  assistantRecipesUsageCount?: number;
};

export type PublicUserAssistantData = {
  mostPopularRecipes?: AssistantRecipeWithStats[];
  mostUsedRecipes?: AssistantRecipeWithStats[];
  recentlyCreatedRecipes?: AssistantRecipeWithStats[];
  allRecipes?: AssistantRecipeWithStats[];
  howManyPublicRecipes?: number;
  howManyPublicCookbooks?: number;
  howMuchRecipeUsage?: number;
  howManyComments?: number;
  assistantRecipesCountPerLanguage?: AssistantRecipesCountPerLanguage[];
};
