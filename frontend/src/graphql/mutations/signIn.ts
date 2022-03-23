import { Tokens } from './../commonTypes';

import { gql } from '@apollo/client';

export interface SignInInput {
  email: string;
  password: string;
}

export const SIGN_IN = gql`
  mutation signIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
      refreshToken
    }
  }
`;

export interface SignInData {
  signIn: Tokens | null;
}