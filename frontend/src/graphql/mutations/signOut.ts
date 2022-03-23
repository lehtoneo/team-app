import { Tokens } from './../commonTypes';

import { gql } from '@apollo/client';

export interface SignOutInput {
  refreshToken: string;
}

export const SIGN_OUT = gql`
  mutation signOut($signOutInput: SignOutInput!) {
    signOut(signOutInput: $signOutInput) {
      success
    }
  }
`;

export interface SignOutData {
  signOut: { success: boolean } | null;
}