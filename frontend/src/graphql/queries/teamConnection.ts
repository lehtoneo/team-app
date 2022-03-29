import { gql } from '@apollo/client';
import { IConnection, Team } from '../commonTypes';

type TeamListInfo = Pick<Team, 'description' | 'id'>;

type TeamConnection = IConnection<TeamListInfo>;

export const TEAM_CONNECTION = gql`
  query teamConnection($paginationInput: PaginationInput) {
    teamConnection(paginationInput: $paginationInput) {
      edges {
        node {
          id
          description
        }
        cursor
      }

      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export interface TeamConnectionData {
  teamConnection?: TeamConnection | null;
}
