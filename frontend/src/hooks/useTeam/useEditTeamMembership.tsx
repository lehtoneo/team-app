import { useMutation, ApolloError } from '@apollo/client';
import { unknownError, UnknownError } from '../../types';
import {
  EditedTeamMemberMutationResult,
  EditTeamMembershipData,
  EditTeamMembershipInput,
  EDIT_TEAM_MEMBERSHIP
} from '../../graphql/mutations/team/editTeamMembership';

type EditTeamMembershipResult =
  | { success: true; membership: EditedTeamMemberMutationResult }
  | { success: false; membership?: null; error: ApolloError | UnknownError };

const useEditTeamMembership = () => {
  const [editTeamMembershipMutation, { error }] = useMutation<
    EditTeamMembershipData,
    { editTeamMembershipInput: EditTeamMembershipInput }
  >(EDIT_TEAM_MEMBERSHIP);
  const editTeamMembership = async (
    editTeamMembershipInput: EditTeamMembershipInput
  ): Promise<EditTeamMembershipResult> => {
    try {
      const res = await editTeamMembershipMutation({
        variables: {
          editTeamMembershipInput
        }
      });

      if (!res.data?.editTeamMembership) {
        return {
          success: false,
          error: unknownError
        };
      } else {
        return {
          success: true,
          membership: res.data.editTeamMembership
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
    editTeamMembership,
    error
  };
};

export default useEditTeamMembership;
