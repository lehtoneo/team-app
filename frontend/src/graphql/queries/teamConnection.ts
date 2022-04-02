import { gql } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { Team } from './team';

export type TeamListInfo = Pick<Team, 'description' | 'id' | 'name'>;

type TeamConnection = IConnection<TeamListInfo>;
interface FilterTeamsInput {
  name?: string;
  ownTeamsOnly?: boolean;
}

export interface TeamConnectionInput {
  paginationInput?: PaginationInput;
  teamFilters?: FilterTeamsInput;
}

export const TEAM_CONNECTION = gql`
  query teamConnection(
    $paginationInput: PaginationInput
    $teamFilters: FilterTeamsInput
  ) {
    teamConnection(
      paginationInput: $paginationInput
      filterTeamsInput: $teamFilters
    ) {
      edges {
        node {
          id
          description
          name
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
