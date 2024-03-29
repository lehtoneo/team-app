import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import tokenManager from './TokenManager';
import { API_URL } from './Config';

export const getApolloClient = () => {
  const httpLink = createHttpLink({
    uri: API_URL
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { accessToken } = await tokenManager.getTokens();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            newsConnection: {
              keyArgs: ['teamId'],
              merge(existing, incoming, { args }) {
                // eslint-disable-next-line no-unused-labels
                if (!existing) {
                  return incoming;
                }

                if (args && !args.after) {
                  return incoming;
                }
                const pageInfo = incoming.pageInfo;

                return {
                  edges: [...existing.edges, ...incoming.edges],
                  pageInfo: { ...incoming.pageInfo }
                };
              }
            }
          }
        }
      }
    })
  });
  return client;
};
