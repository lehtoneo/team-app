import { TeamTeamMembership, TEAM_QUERY } from './../../queries/team';

import { gql, useMutation } from '@apollo/client';

export interface DeleteTeamMembershipInput {
  teamId: number;
  userId: number;
}

export type DeletedTeamMembershipResult = Pick<
  TeamTeamMembership,
  'id' | 'role'
>;

export const DELETE_TEAM_MEMBERSHIP = gql`
  mutation deleteTeamMembership(
    $deleteTeamMembershipInput: DeleteTeamMembershipInput!
  ) {
    deleteTeamMembership(
      deleteTeamMembershipInput: $deleteTeamMembershipInput
    ) {
      id
      role
    }
  }
`;

export interface DeleteTeamMembershipData {
  deleteTeamMembership: DeletedTeamMembershipResult | null;
}

export function useDeleteTeamMemberMutation() {
  return useMutation<
    DeleteTeamMembershipData,
    { deleteTeamMembershipInput: DeleteTeamMembershipInput }
  >(DELETE_TEAM_MEMBERSHIP, { refetchQueries: [TEAM_QUERY] });
}
