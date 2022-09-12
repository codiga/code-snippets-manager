import rollbarAccessToken from './rollbarAccessToken';

export const rollbarConfig = {
  accessToken: rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: { environment: process.env.NODE_ENV || 'development' },
  autoInstrument: {
    network: true,
    networkResponseHeaders: true,
    // networkResponseBody: true,
    networkRequestBody: true,
    log: true,
    dom: true,
    navigation: true,
    connectivity: true,
    contentSecurityPolicy: true,
    errorOnContentSecurityPolicy: true,
  },
};
