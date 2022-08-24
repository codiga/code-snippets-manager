const isProd = process.env.NODE_ENV === 'production';
export const APP_URL = isProd
  ? 'https://app.codiga.io'
  : 'https://app-staging.codiga.io';
export const API_ROOT_URL = isProd
  ? 'https://api.codiga.io'
  : 'https://api-staging.codiga.io';
export const API_URL = `${API_ROOT_URL}/graphql`;
export const TOKEN = 'electron-token';
export const CODIGA_THEME = 'codiga-ui-mode';
