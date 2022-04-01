import { gql } from '@apollo/client';
import { IConnection, PaginationInput, Team } from '../commonTypes';

export type TeamQuerySuccessData = Pick<
  Team,
  'description' | 'id' | 'name' | 'members' | 'events'
>;

export interface TeamInput {
  id: number;
}

export const TEAM_QUERY = gql`
  query oneTeam($id: ID!) {
    oneTeam(id: $id) {
      id
      description
      name
      members {
        id
        firstname
      }
      events {
        id
        name
        description
        start
        end
        team {
          id
        }
      }
    }
  }
`;

export interface TeamQueryData {
  oneTeam?: Team | null;
}
