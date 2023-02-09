import { gql } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { Team } from './team';

export type TeamListInfo = Pick<
  Team,
  'description' | 'id' | 'name' | 'currentUserTeamMembership'
>;

type TeamConnection = IConnection<TeamListInfo>;
interface FilterTeamsInput {
  name?: string;
  ownTeamsOnly?: boolean;
}

export interface TeamConnectionInput extends PaginationInput {
  teamFilters?: FilterTeamsInput;
}

export const TEAM_CONNECTION = gql`
  query teamConnection(
    $first: Int
    $before: String
    $after: String
    $teamFilters: FilterTeamsInput
  ) {
    teamConnection(
      first: $first
      before: $before
      after: $after
      filterTeamsInput: $teamFilters
    ) {
      edges {
        node {
          id
          description
          name
          currentUserTeamMembership {
            id
            role
          }
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
