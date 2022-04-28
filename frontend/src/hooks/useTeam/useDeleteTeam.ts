import { unknownError } from './../../types/index';

import { ApolloError, useApolloClient } from '@apollo/client';
import { useDeleteTeamMutation } from '../../graphql/mutations/team/deleteTeam';
const useDeleteTeam = () => {
  const [deleteTeamMutation, { error }] = useDeleteTeamMutation();
  const apolloClient = useApolloClient();
  const deleteTeam = async (id: number) => {
    try {
      const result = await deleteTeamMutation({
        variables: {
          id
        }
      });
      if (result.data) {
        apolloClient.cache.evict({ id: `Team:${id}` });
        return {
          success: true,
          teamId: result.data
        };
      } else {
        return {
          success: false,
          error: unknownError
        };
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        return {
          success: false,
          error: e
        };
      } else {
        return {
          success: false,
          error: unknownError
        };
      }
    }
  };

  return {
    deleteTeam,
    error
  };
};

export default useDeleteTeam;
