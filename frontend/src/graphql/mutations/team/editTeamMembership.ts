import { TeamMemberRole, TeamTeamMembership } from './../../queries/team';

import { gql } from '@apollo/client';

export interface EditTeamMembershipInput {
  teamId: number;
  userId: number;
  role: TeamMemberRole;
}

export type EditedTeamMemberMutationResult = Pick<
  TeamTeamMembership,
  'id' | 'role'
>;

export const EDIT_TEAM_MEMBERSHIP = gql`
  mutation editTeamMembership(
    $editTeamMembershipInput: EditTeamMembershipInput!
  ) {
    editTeamMembership(editTeamMembershipInput: $editTeamMembershipInput) {
      id
      role
    }
  }
`;

export interface EditTeamMembershipData {
  editTeamMembership: EditedTeamMemberMutationResult | null;
}
