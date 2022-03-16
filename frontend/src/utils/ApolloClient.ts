import { ApolloClient, InMemoryCache } from '@apollo/client';
const { REACT_APP_BACKEND_URL } = process.env;

const API_URL =
  process.env.NODE_ENV === 'production'
    ? REACT_APP_BACKEND_URL
    : REACT_APP_BACKEND_URL
    ? REACT_APP_BACKEND_URL
    : 'http://localhost:5000/graphql';

export const getApolloClient = () => {
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  });
  return client;
};
