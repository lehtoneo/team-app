import { TeamQueryData, TEAM_QUERY } from './../graphql/queries/team';

import { useQuery } from '@apollo/client';
import { TeamInput } from '../graphql/queries/team';

const useTeam = (args: TeamInput) => {
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
        console.log({ d });
      }
    }
  );

  return {
    team: data?.oneTeam || undefined,
    loading,
    error
  };
};

export default useTeam;
