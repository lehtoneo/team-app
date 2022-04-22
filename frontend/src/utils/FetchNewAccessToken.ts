import {
  NewAccessTokenData,
  NewAccessTokenInput,
  NEW_ACCESS_TOKEN
} from '../graphql/mutations/newAccessToken';
import { API_URL } from './Config';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(API_URL, { headers: {} });

const fetchNewAccessToken = async (refreshToken: string) => {
  console.log('here!!!!');
  try {
    const result = await client.request<
      NewAccessTokenData,
      NewAccessTokenInput
    >(NEW_ACCESS_TOKEN, { refreshToken });
    return result.newAccessToken?.accessToken || null;
  } catch (e) {
    return null;
  }
};

export { fetchNewAccessToken };
