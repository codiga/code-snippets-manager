import { RecipeVariableType } from '../types/assistantTypes';

export enum Language {
  LANGUAGE_UNKNOWN = 'Unknown',
  LANGUAGE_DOCKER = 'Docker',
  LANGUAGE_OBJECTIVE_C = 'Objectivec',
  LANGUAGE_TERRAFORM = 'Terraform',
  LANGUAGE_JSON = 'Json',
  LANGUAGE_YAML = 'Yaml',
  LANGUAGE_TYPESCRIPT = 'Typescript',
  LANGUAGE_TWIG = 'Twig',
  LANGUAGE_SWIFT = 'Swift',
  LANGUAGE_SOLIDITY = 'Solidity',
  LANGUAGE_SQL = 'Sql',
  LANGUAGE_SHELL = 'Shell',
  LANGUAGE_SCALA = 'Scala',
  LANGUAGE_SCSS = 'Scss',
  LANGUAGE_SASS = 'Sass',
  LANGUAGE_REACT = 'React',
  LANGUAGE_PASCAL = 'Pascal',
  LANGUAGE_RUST = 'Rust',
  LANGUAGE_RUBY = 'Ruby',
  LANGUAGE_PHP = 'Php',
  LANGUAGE_PYTHON = 'Python',
  LANGUAGE_PERL = 'Perl',
  LANGUAGE_MARKDOWN = 'Markdown',
  LANGUAGE_KOTLIN = 'Kotlin',
  LANGUAGE_JAVASCRIPT = 'Javascript',
  LANGUAGE_JAVA = 'Java',
  LANGUAGE_HTML = 'Html',
  LANGUAGE_HASKELL = 'Haskell',
  LANGUAGE_GO = 'Go',
  LANGUAGE_DART = 'Dart',
  LANGUAGE_CSHARP = 'Csharp',
  LANGUAGE_COLDFUSION = 'Coldfusion',
  LANGUAGE_CSS = 'Css',
  LANGUAGE_CPP = 'Cpp',
  LANGUAGE_C = 'C',
  LANGUAGE_APEX = 'Apex',
  LANGUAGE_VISUAL = 'Visual',
  ALL_LANGUAGES = 'All languages',
}

export enum Library {
  REACT = 'react',
  VUE = 'vue',
  NEXTJS = 'next',
  ANGULAR = 'angular',
  DJANGO = 'django',
  FLASK = 'flask',
  REMIX = 'remix',
  REQUESTS = 'requests',
  NUMPY = 'numpy',
  BOTO3 = 'boto3',
  CHAKRA = '@chakra-ui/react',
  RAILS = 'rails',
  JEST = 'jest',
  EXPRESS = 'express',
  APOLLO = '@apollo/client',
  GRAPHQL = 'graphql',
  PYTORCH = 'pytorch',
  TENSORFLOW = 'tensorflow',
  MYSQLCONNECTOR = 'mysql-connector-python',
  REACTNATIVE = 'react-native',
}

// TODO: The backend name should be the enum value?
// it might be error prone in case some decides to change
// the value of the label for viewability purposes
export const ALL_LIBRARIES_PER_LANGUAGE: {
  [x in Language]?: { label: Library; backendName: string }[];
} = {
  [Language.LANGUAGE_TYPESCRIPT]: [
    {
      label: Library.REACT,
      backendName: 'react',
    },
    {
      label: Library.VUE,
      backendName: 'vue',
    },
    {
      label: Library.REMIX,
      backendName: 'remix',
    },
    {
      label: Library.ANGULAR,
      backendName: 'angular',
    },
    {
      label: Library.NEXTJS,
      backendName: 'next',
    },
    {
      label: Library.CHAKRA,
      backendName: '@chakra-ui/react',
    },
    {
      label: Library.JEST,
      backendName: 'jest',
    },
    {
      label: Library.EXPRESS,
      backendName: 'express',
    },
    {
      label: Library.APOLLO,
      backendName: '@apollo/client',
    },
    {
      label: Library.GRAPHQL,
      backendName: 'graphql',
    },
    {
      label: Library.REACTNATIVE,
      backendName: 'react-native',
    },
  ],
  [Language.LANGUAGE_JAVASCRIPT]: [
    {
      label: Library.REACT,
      backendName: 'react',
    },
    {
      label: Library.VUE,
      backendName: 'vue',
    },
    {
      label: Library.REMIX,
      backendName: 'remix',
    },
    {
      label: Library.ANGULAR,
      backendName: 'angular',
    },
    {
      label: Library.NEXTJS,
      backendName: 'next',
    },
    {
      label: Library.CHAKRA,
      backendName: '@chakra-ui/react',
    },
    {
      label: Library.JEST,
      backendName: 'jest',
    },
    {
      label: Library.EXPRESS,
      backendName: 'express',
    },
    {
      label: Library.APOLLO,
      backendName: '@apollo/client',
    },
    {
      label: Library.GRAPHQL,
      backendName: 'graphql',
    },
    {
      label: Library.REACTNATIVE,
      backendName: 'react-native',
    },
  ],
  [Language.LANGUAGE_PYTHON]: [
    {
      label: Library.DJANGO,
      backendName: 'django',
    },
    {
      label: Library.FLASK,
      backendName: 'flask',
    },
    {
      label: Library.REQUESTS,
      backendName: 'requests',
    },
    {
      label: Library.NUMPY,
      backendName: 'numpy',
    },
    {
      label: Library.BOTO3,
      backendName: 'boto3',
    },
    {
      label: Library.PYTORCH,
      backendName: 'pytorch',
    },
    {
      label: Library.TENSORFLOW,
      backendName: 'tensorflow',
    },
    {
      label: Library.MYSQLCONNECTOR,
      backendName: 'mysql-connector-python',
    },
  ],
  [Language.LANGUAGE_RUBY]: [
    {
      label: Library.RAILS,
      backendName: 'rails',
    },
  ],
};

export enum AllLibraries {
  ALL_LIBRARIES = 'All libraries',
}

export enum RecipeVariable {
  GET_FILENAME = '&[GET_FILENAME]',
  GET_FILENAME_NO_EXT = '&[GET_FILENAME_NO_EXT]',
  GET_SELECTED_TEXT = '&[GET_SELECTED_TEXT]',
  GET_LINE_NUMBER = '&[GET_LINE_NUMBER]',
  GET_DIRECTORY = '&[GET_DIRECTORY]',
  GET_FILEPATH = '&[GET_FILEPATH]',
  GET_FILEPATH_RELATIVE = '&[GET_FILEPATH_RELATIVE]',
  GET_CLIPBOARD = '&[GET_CLIPBOARD]',
  GET_PROJECT_WORKSPACE = '&[GET_PROJECT_WORKSPACE]',
  GET_PROJECT_DIRECTORY = '&[GET_PROJECT_DIRECTORY]',
  DATE_DAY_NAME = '&[DATE_DAY_NAME]',
  DATE_MONTH_NAME = '&[DATE_MONTH_NAME]',
  DATE_DAY_NAME_SHORT = '&[DATE_DAY_NAME_SHORT]',
  DATE_MONTH_NAME_SHORT = '&[DATE_MONTH_NAME_SHORT]',
  DATE_MONTH_TWO_DIGITS = '&[DATE_MONTH_TWO_DIGITS]',
  DATE_CURRENT_DAY = '&[DATE_CURRENT_DAY]',
  DATE_CURRENT_YEAR = '&[DATE_CURRENT_YEAR]',
  DATE_CURRENT_YEAR_SHORT = '$[DATE_CURRENT_YEAR_SHORT]',
  DATE_CURRENT_HOUR = '&[DATE_CURENT_HOUR]',
  DATE_CURRENT_MINUTE = '&[DATE_CURRENT_MINUTE]',
  DATE_CURRENT_SECOND = '&[DATE_CURRENT_SECOND]',
  DATE_CURRENT_SECOND_UNIX = '&[DATE_CURRENT_SECOND_UNIX]',
  RANDOM_BASE_10 = '&[RANDOM_BASE_10]',
  RANDOM_BASE_16 = '&[RANDOM_BASE_16]',
  RANDOM_UUID = '&[RANDOM_UUID]',
}

export const ALL_RECIPE_VARIABLES: RecipeVariableType[] = [
  {
    text: RecipeVariable.GET_FILENAME,
    displayText: `${RecipeVariable.GET_FILENAME} - filename`,
  },
  {
    text: RecipeVariable.GET_FILENAME_NO_EXT,
    displayText: `${RecipeVariable.GET_FILENAME_NO_EXT} - filename no ext`,
  },
  {
    text: RecipeVariable.GET_SELECTED_TEXT,
    displayText: `${RecipeVariable.GET_SELECTED_TEXT} - selected text`,
  },
  {
    text: RecipeVariable.GET_LINE_NUMBER,
    displayText: `${RecipeVariable.GET_LINE_NUMBER} - one-index line number`,
  },
  {
    text: RecipeVariable.GET_DIRECTORY,
    displayText: `${RecipeVariable.GET_DIRECTORY} - current directory`,
  },
  {
    text: RecipeVariable.GET_FILEPATH,
    displayText: `${RecipeVariable.GET_FILEPATH} - full file path`,
  },
  {
    text: RecipeVariable.GET_FILEPATH_RELATIVE,
    displayText: `${RecipeVariable.GET_FILEPATH_RELATIVE} - relative file path`,
  },
  {
    text: RecipeVariable.GET_CLIPBOARD,
    displayText: `${RecipeVariable.GET_CLIPBOARD} - clipboard contents`,
  },
  {
    text: RecipeVariable.GET_PROJECT_WORKSPACE,
    displayText: `${RecipeVariable.GET_PROJECT_WORKSPACE} - workspace name`,
  },
  {
    text: RecipeVariable.GET_PROJECT_DIRECTORY,
    displayText: `${RecipeVariable.GET_PROJECT_DIRECTORY} - workspace path`,
  },
  {
    text: RecipeVariable.DATE_DAY_NAME,
    displayText: `${RecipeVariable.DATE_DAY_NAME} - day name`,
  },
  {
    text: RecipeVariable.DATE_MONTH_NAME,
    displayText: `${RecipeVariable.DATE_MONTH_NAME} - month name`,
  },
  {
    text: RecipeVariable.DATE_DAY_NAME_SHORT,
    displayText: `${RecipeVariable.DATE_DAY_NAME_SHORT} - day name short`,
  },
  {
    text: RecipeVariable.DATE_MONTH_NAME_SHORT,
    displayText: `${RecipeVariable.DATE_MONTH_NAME_SHORT} - month name short`,
  },
  {
    text: RecipeVariable.DATE_MONTH_TWO_DIGITS,
    displayText: `${RecipeVariable.DATE_MONTH_TWO_DIGITS} - month 2 digits`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_DAY,
    displayText: `${RecipeVariable.DATE_CURRENT_DAY} - day in month`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_YEAR,
    displayText: `${RecipeVariable.DATE_CURRENT_YEAR} - year`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_YEAR_SHORT,
    displayText: `${RecipeVariable.DATE_CURRENT_YEAR_SHORT} - yr 2 digits`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_HOUR,
    displayText: `${RecipeVariable.DATE_CURRENT_HOUR} - hour 24 format`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_MINUTE,
    displayText: `${RecipeVariable.DATE_CURRENT_MINUTE} - minute`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_SECOND,
    displayText: `${RecipeVariable.DATE_CURRENT_SECOND} - second`,
  },
  {
    text: RecipeVariable.DATE_CURRENT_SECOND_UNIX,
    displayText: `${RecipeVariable.DATE_CURRENT_SECOND_UNIX} - second since unix`,
  },
  {
    text: RecipeVariable.RANDOM_BASE_10,
    displayText: `${RecipeVariable.RANDOM_BASE_10} - rnd decimal`,
  },
  {
    text: RecipeVariable.RANDOM_BASE_16,
    displayText: `${RecipeVariable.RANDOM_BASE_16} - rnd hexdecimal`,
  },
  {
    text: RecipeVariable.RANDOM_UUID,
    displayText: `${RecipeVariable.RANDOM_UUID} - rnd uuid v4`,
  },
];

export const JWT = 'jwt';

export enum UserPreferenceKey {
  EnableGravatar = 'EnableGravatar',
  EnableAssistantWeeklySummary = 'EnableAssistantWeeklySummary',
  EnableAssistantRecipeCommentNotification = 'EnableAssistantRecipeCommentNotification',
  UserWizardLaunched = 'UserWizardLaunched',
  CodingAssistantEnabled = 'CodingAssistantEnabled',
  EnablePublicProfile = 'EnablePublicProfile',
  Theme = 'Theme',
}

// Common fields
export enum RecipeSortingFields {
  // Language = 'Language',
  Name = 'Name',
  Timestamp = 'CreationTimestamp',
  Visibility = 'Visibility',
  Privacy = 'Privacy',
  Rating = 'Rating',
  Uses = 'Uses',
  Cookbook = 'Cookbook',
}

export enum CookBookSortingFields {
  Name = 'Name',
  Timestamp = 'CreationTimestamp',
}

export enum AccountTypeEnum {
  Unknown = 'Unknown',
  Bitbucket = 'Bitbucket',
  Gitlab = 'Gitlab',
  Github = 'Github',
  Regular = 'Regular',
  Git = 'Git',
  Google = 'Google',
}

export const POLL_USER_FOR_LOGOUT_MSEC = 5000; // every 5 seconds

export const GET_GITHUB_APP_URL = (githubInstallationIdentifier: number) =>
  `https://github.com/settings/installations/${githubInstallationIdentifier}`;

export const GET_GITHUB_ORGANIZATION_REPOS_URL = (
  organizationName: string,
  githubInstallationIdentifier: number
) =>
  `https://github.com/organizations/${organizationName}/settings/installations/${githubInstallationIdentifier}`;

export const FILTERED_LANGUAGES = [
  Language.LANGUAGE_UNKNOWN,
  Language.ALL_LANGUAGES,
  Language.LANGUAGE_REACT,
  Language.LANGUAGE_PASCAL,
  Language.LANGUAGE_VISUAL,
  Language.LANGUAGE_PERL,
];

export const ALL_LANGUAGES = Object.values(Language)
  .filter((lng) => !FILTERED_LANGUAGES.includes(lng))
  .map((l) => l.toString());

export const ALL_LANGUAGES_ENUM = Object.values(Language).filter(
  (lng) => !FILTERED_LANGUAGES.includes(lng)
);

export const ALL_LANGUAGES_DEFAULT = [Language.ALL_LANGUAGES.toString()].concat(
  ALL_LANGUAGES
);

// Ranking
export enum RankingPageTabs {
  TAB_ALLTIME_PUBLIC_STATS = 'all-time-public-stats',
  TAB_WEEKLY_PUBLIC_STATS = 'weekly-public-stats',
}

// Login redirection
export const LOGIN_FROM = 'loginFrom';
export const EXTRA_PARAMS = 'extraParams';
export const GOOGLE_STATE = 'google-state';

export const defaultMetaInfo = {
  recipes: {
    name: 'Codiga Recipes',
    language: Language.LANGUAGE_UNKNOWN,
    tags: ['code snippets', 'code recipes'],
    owner: {
      username: '',
    },
    keywords: [],
  },
  cookbooks: {
    name: 'Codiga Cookbooks',
    tags: ['code snippets', 'code cookbook', 'coding assistant'],
    owner: {
      username: '',
    },
    keywords: [],
  },
};

export enum SSOProvider {
  github = 'Github',
  gitlab = 'Gitlab',
  bitbucket = 'Bitbucket',
  google = 'Google',
}

export type SSOProviderKey = keyof typeof SSOProvider;
export type SSOProviderValue = Capitalize<SSOProviderKey>;

export const SSO_PROVIDERS = Object.values(
  SSOProvider
) as Capitalize<SSOProviderKey>[];

export const SSO_PROVIDERS_LOWER = SSO_PROVIDERS.map((val) =>
  val.toLowerCase()
) as Lowercase<SSOProviderKey>[];

export const REVALIDATE_USER_PAGE_IN_SECONDS = 60;
export const PAGE_QUERY_POLL_INTERVAL_IN_MS = 10000;
