import { ApolloError } from '@apollo/client';
import {
  DeletedTeamMembershipResult,
  DeleteTeamMembershipInput,
  useDeleteTeamMemberMutation
} from '../../graphql/mutations/team/deleteTeamMembership';
import { unknownError, UnknownError } from '../../types';

type DeleteTeamMembershipResult =
  | { success: true; membership: DeletedTeamMembershipResult }
  | { success: false; membership?: null; error: ApolloError | UnknownError };

const useDeleteTeamMembership = () => {
  const [deleteTeamMemberMutation, { error }] = useDeleteTeamMemberMutation();

  const deleteTeamMembership = async (
    deleteTeamMembershipInput: DeleteTeamMembershipInput
  ): Promise<DeleteTeamMembershipResult> => {
    try {
      const res = await deleteTeamMemberMutation({
        variables: {
          deleteTeamMembershipInput
        }
      });

      if (!res.data?.deleteTeamMembership) {
        return {
          success: false,
          error: unknownError
        };
      } else {
        return {
          success: true,
          membership: res.data.deleteTeamMembership
        };
      }
    } catch (e: any) {
      if (e instanceof ApolloError) {
        return {
          success: false,
          error: e
        };
      }
      return {
        success: false,
        error: unknownError
      };
    }
  };

  return {
    deleteTeamMembership,
    error
  };
};

export default useDeleteTeamMembership;
