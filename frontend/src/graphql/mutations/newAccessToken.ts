import { gql } from '@apollo/client';
import { Tokens } from '../commonTypes';

export interface NewAccessTokenInput {
  refreshToken: string;
}

export const NEW_ACCESS_TOKEN = gql`
  mutation newAccessToken($refreshToken: String!) {
    newAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export interface NewAccessTokenData {
  newAccessToken: Pick<Tokens, 'accessToken'> | null;
}
