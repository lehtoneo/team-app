import { User } from './../commonTypes';
import { gql } from '@apollo/client';
import { IConnection, Team } from '../commonTypes';

export type MeUserData = Pick<User, 'id' | 'email' | 'firstname'>;

export const ME = gql`
  query me {
    me {
      id
      email
      firstname
    }
  }
`;

export interface MeData {
  me: MeUserData | null;
}
