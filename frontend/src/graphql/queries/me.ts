import { gql } from '@apollo/client';
import { IConnection, Workout } from '../commonTypes';

export interface AllUserData {
  id: string;
  email: string;
  firstname: string;
}

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
  me: AllUserData;
}
