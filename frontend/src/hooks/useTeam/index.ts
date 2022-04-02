import { GetOneTeamInput } from './../../graphql/queries/team';
import { TeamQueryData, TEAM_QUERY } from '../../graphql/queries/team';

import { useQuery } from '@apollo/client';
import useCreateTeam from './useCreateTeam';
import useCreateTeamEvent from './useCreateTeamEvent';
import useJoinTeam from './useJoinTeam';

const useTeam = (args: GetOneTeamInput) => {
  const { joinTeam, error: joinTeamError } = useJoinTeam();
  const { createTeam, error: createTeamError } = useCreateTeam();
  const { createTeamEvent, error: createTeamEventError } = useCreateTeamEvent();
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
    createTeamEvent,
    createTeamEventError,
    joinTeam,
    joinTeamError
  };
};

export default useTeam;
