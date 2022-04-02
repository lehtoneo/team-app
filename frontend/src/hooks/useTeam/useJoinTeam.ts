import {
  JoinTeamData,
  JoinedTeamMutationResult,
  JOIN_TEAM,
  JoinTeamInput
} from './../../graphql/mutations/joinTeam';
import { useMutation } from '@apollo/client';

type JoinTeamResult =
  | { success: true; team: JoinedTeamMutationResult }
  | { success: false; team?: null };

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
          success: false
        };
      } else {
        return {
          success: true,
          team: res.data.joinTeam
        };
      }
    } catch (e) {
      return {
        success: false
      };
    }
  };
  return {
    joinTeam,
    error
  };
};

export default useJoinTeam;
