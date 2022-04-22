import { unknownError, UnknownError } from './../../types/index';
import { CreatedTeamMutationResult } from '../../graphql/mutations/team/createTeam';
import { ApolloError, useMutation } from '@apollo/client';
import {
  CREATE_TEAM,
  CreateTeamInput,
  CreateTeamData
} from '../../graphql/mutations/team/createTeam';

type CreateTeamResult =
  | { success: true; team: CreatedTeamMutationResult }
  | { success: false; team?: null; error: ApolloError | UnknownError };

const useCreateTeam = () => {
  const [createTeamMutation, { error }] = useMutation<
    CreateTeamData,
    { createTeamInput: CreateTeamInput }
  >(CREATE_TEAM);
  const createTeam = async (
    createTeamInput: CreateTeamInput
  ): Promise<CreateTeamResult> => {
    try {
      const res = await createTeamMutation({
        variables: {
          createTeamInput
        }
      });

      if (!res.data?.createTeam) {
        return {
          success: false,
          error: unknownError
        };
      } else {
        return {
          success: true,
          team: res.data.createTeam
        };
      }
    } catch (e) {
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
    createTeam,
    error
  };
};

export default useCreateTeam;
