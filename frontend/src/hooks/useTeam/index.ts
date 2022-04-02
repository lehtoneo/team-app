import { TeamQueryData, TEAM_QUERY } from '../../graphql/queries/team';

import { useQuery } from '@apollo/client';
import { TeamInput } from '../../graphql/queries/team';
import useCreateTeam from './useCreateTeam';
import useCreateTeamEvent from './useCreateTeamEvent';

const useTeam = (args: TeamInput) => {
  const { createTeam, error: createTeamError } = useCreateTeam();
  const { createTeamEvent, error: createTeamEventError } = useCreateTeamEvent();
  const { data, loading, error } = useQuery<TeamQueryData, TeamInput>(
    TEAM_QUERY,
    {
      variables: {
        ...args
      },
      onError: (e) => {
        console.log(e);
      },
      onCompleted: (d) => {
        // console.log({ d });
      }
    }
  );
  return {
    team: data?.oneTeam,
    loading: data?.oneTeam === undefined,
    error,
    createTeam,
    createTeamError,
    createTeamEvent,
    createTeamEventError
  };
};

export default useTeam;
