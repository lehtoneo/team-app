import { ApolloClient, InMemoryCache } from '@apollo/client';
const { GRAPHQL_API_URL } = process.env;

const API_URL =
  process.env.NODE_ENV === 'production'
    ? GRAPHQL_API_URL
    : GRAPHQL_API_URL
    ? GRAPHQL_API_URL
    : 'http://localhost:5000/graphql';

export const getApolloClient = () => {
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  });
  return client;
};
