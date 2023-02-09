import { TeamConnectionInput } from './../graphql/queries/teamConnection';
import {
  TeamConnectionData,
  TEAM_CONNECTION
} from '../graphql/queries/teamConnection';
import { useQuery } from '@apollo/client';

const useTeamConnection = (args: TeamConnectionInput) => {
  const { data, loading } = useQuery<TeamConnectionData, TeamConnectionInput>(
    TEAM_CONNECTION,
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
    teams: data?.teamConnection?.edges.map((edge) => edge.node) || [],
    loading
  };
};

export default useTeamConnection;
