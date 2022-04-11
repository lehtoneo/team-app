import { GetOneTeamInput } from './../../graphql/queries/team';
import { TeamQueryData, TEAM_QUERY } from '../../graphql/queries/team';

import { useQuery } from '@apollo/client';
import useCreateTeam from './useCreateTeam';
import useJoinTeam from './useJoinTeam';
import useEditTeam from './useEditTeam';
import useEditTeamMembership from './useEditTeamMembership';

const useTeam = (args: GetOneTeamInput) => {
  const { editTeam, error: editTeamError } = useEditTeam();
  const { joinTeam, error: joinTeamError } = useJoinTeam();
  const { createTeam, error: createTeamError } = useCreateTeam();
  const { editTeamMembership, error: editTeamMembershipError } =
    useEditTeamMembership();
  const { data, loading, error } = useQuery<
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
    editTeamMembershipError
  };
};

export default useTeam;
