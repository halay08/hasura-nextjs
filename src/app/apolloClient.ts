import { ApolloClient, InMemoryCache, HttpLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from './configs';
import Config from './configs/config.json';

const httpLink = new HttpLink({ uri: GRAPHQL_URL });
const authLink = setContext(async (_: any, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: concat(authLink, httpLink),
  uri: GRAPHQL_URL,
  cache,
  connectToDevTools: Config.NODE_ENV !== 'production'
});
