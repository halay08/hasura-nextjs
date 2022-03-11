import Config from './config.json';

export const GRAPHQL_URL =
  Config.REACT_APP_HASURA_GRAPHQL_URL || `http://localhost:8090/v1/graphql`;
