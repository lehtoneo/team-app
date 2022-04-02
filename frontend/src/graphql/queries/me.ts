import { gql } from '@apollo/client';
import { Team } from './team';

export interface User {
  id: number;
  email: string;
  firstname: string;
  teams: Team[];
}

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
