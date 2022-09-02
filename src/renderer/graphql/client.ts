import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';
import DebounceLink from 'apollo-link-debounce';
import { API_URL, TOKEN } from '../lib/config';

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

const Link = ApolloLink.from([
  new DebounceLink(DEFAULT_DEBOUNCE_TIMEOUT),
  new HttpLink({
    uri: API_URL,
    fetch,
  }),
]);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-Api-Token': token || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(Link),
  cache: new InMemoryCache(),
});

export default client;
