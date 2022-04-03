import {
  JoinTeamData,
  JoinedTeamMutationResult,
  JOIN_TEAM,
  JoinTeamInput
} from './../../graphql/mutations/joinTeam';
import { useMutation, ApolloError } from '@apollo/client';

const unknownError: UnknownError = {
  message: 'Unknown error'
};

interface UnknownError {
  message: 'Unknown error';
}

type JoinTeamResult =
  | { success: true; team: JoinedTeamMutationResult }
  | { success: false; team?: null; error: ApolloError | UnknownError };

const useJoinTeam = () => {
  const [createTeamMutation, { error }] = useMutation<
    JoinTeamData,
    { joinTeamInput: JoinTeamInput }
  >(JOIN_TEAM);
  const joinTeam = async (
    joinTeamInput: JoinTeamInput
  ): Promise<JoinTeamResult> => {
    try {
      const res = await createTeamMutation({
        variables: {
          joinTeamInput
        }
      });

      if (!res.data?.joinTeam) {
        return {
          success: false,
          error: unknownError
        };
      } else {
        return {
          success: true,
          team: res.data.joinTeam
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
    joinTeam,
    error
  };
};

export default useJoinTeam;
