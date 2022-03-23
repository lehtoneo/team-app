import { Tokens } from './../commonTypes';

import { gql } from '@apollo/client';

export interface CreateUserInput {
  firstname: string;
  email: string;
  password: string;
}

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      accessToken
      refreshToken
    }
  }
`;

export interface CreateUserData {
  createUser: Tokens | null;
}
