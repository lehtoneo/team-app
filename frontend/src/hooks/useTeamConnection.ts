import React from 'react';
import {
  TeamConnectionData,
  TEAM_CONNECTION
} from '../graphql/queries/teamConnection';
import { useQuery } from '@apollo/client';

import { PaginationInput } from '../graphql/commonTypes';

const useTeamConnection = (args?: PaginationInput) => {
  const { data, loading } = useQuery<TeamConnectionData>(TEAM_CONNECTION, {
    variables: {
      paginationInput: args
    },
    onError: (e) => {
      console.log(e);
    }
  });

  return {
    teams: data?.teamConnection?.edges.map((edge) => edge.node) || [],
    loading
  };
};

export default useTeamConnection;
