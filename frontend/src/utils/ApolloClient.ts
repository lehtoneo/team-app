import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:5000/graphql" 
  : '/graphql';

export const getApolloClient = () => {
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  });
  return client;
};
