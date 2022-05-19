import { GetOneTeamInput } from './../../graphql/queries/team';
import { TeamQueryData, TEAM_QUERY } from '../../graphql/queries/team';

import { useQuery } from '@apollo/client';
import useCreateTeam from './useCreateTeam';
import useJoinTeam from './useJoinTeam';
import useEditTeam from './useEditTeam';
import useEditTeamMembership from './useEditTeamMembership';
import useTeamAuth from './useTeamAuth';
import useDeleteTeam from './useDeleteTeam';
import useDeleteTeamMembership from './useDeleteTeamMembership';

const useTeam = (args: GetOneTeamInput) => {
  const { editTeam, error: editTeamError } = useEditTeam();
  const { joinTeam, error: joinTeamError } = useJoinTeam();
  const { createTeam, error: createTeamError } = useCreateTeam();
  const { deleteTeam, error: deleteTeamError } = useDeleteTeam();
  const { editTeamMembership, error: editTeamMembershipError } =
    useEditTeamMembership();
  const { deleteTeamMembership, error: deleteTeamMembershipError } =
    useDeleteTeamMembership();

  const { data, error } = useQuery<
    TeamQueryData,
    { getOneTeamInput: GetOneTeamInput }
  >(TEAM_QUERY, {
    variables: {
      getOneTeamInput: args
    },
    onError: (e) => {
      console.log(e);
    },
    onCompleted: (d) => {
      // console.log({ d });
    }
  });

  const { teamAuth } = useTeamAuth({
    currentUserTeamMembership: data?.oneTeam?.currentUserTeamMembership
  });
  return {
    team: data?.oneTeam,
    loading: data?.oneTeam === undefined,
    error,
    createTeam,
    createTeamError,
    joinTeam,
    joinTeamError,
    editTeam,
    editTeamError,
    editTeamMembership,
    editTeamMembershipError,
    deleteTeam,
    deleteTeamError,
    deleteTeamMembership,
    deleteTeamMembershipError,
    teamAuth
  };
};

export default useTeam;
