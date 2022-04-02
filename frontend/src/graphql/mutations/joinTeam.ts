import { Team } from '../queries/team';

import { gql } from '@apollo/client';

export interface JoinTeamInput {
  joinId: string;
}

export type JoinedTeamMutationResult = Pick<
  Team,
  'id' | 'currentUserTeamMembership' | 'name'
>;

export const JOIN_TEAM = gql`
  mutation joinTeam($joinTeamInput: JoinTeamInput!) {
    joinTeam(joinTeamInput: $joinTeamInput) {
      id
      name
      currentUserTeamMembership {
        id
        role
      }
    }
  }
`;

export interface JoinTeamData {
  joinTeam: JoinedTeamMutationResult | null;
}
