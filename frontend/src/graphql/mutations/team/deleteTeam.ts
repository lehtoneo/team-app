import { TEAM_CONNECTION } from './../../queries/teamConnection';
import { gql, useMutation } from '@apollo/client';

export const EDIT_TEAM = gql`
  mutation deleteTeam($id: Int!) {
    deleteTeam(id: $id)
  }
`;

export interface DeleteTeamResponse {
  deleteTeam: number | null;
}

export function useDeleteTeamMutation() {
  return useMutation<DeleteTeamResponse, { id: number }>(EDIT_TEAM, {
    refetchQueries: [TEAM_CONNECTION]
  });
}
