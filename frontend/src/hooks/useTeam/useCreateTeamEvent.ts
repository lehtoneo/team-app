import {
  CreatedTeamEventMutationResult,
  CreateTeamEventData,
  CreateTeamEventInput,
  CREATE_TEAM_EVENT
} from './../../graphql/mutations/createTeamEvent';
import { useMutation } from '@apollo/client';
import { TEAM_QUERY } from '../../graphql/queries/team';

type CreateTeamEventResult =
  | { success: true; event: CreatedTeamEventMutationResult }
  | { success: false; event?: null };

const useCreateTeamEvent = () => {
  const [createTeamEventMutation, { error }] = useMutation<
    CreateTeamEventData,
    { createTeamEventInput: CreateTeamEventInput }
  >(CREATE_TEAM_EVENT, { refetchQueries: [TEAM_QUERY] });

  const createTeamEvent = async (
    createTeamEventInput: CreateTeamEventInput
  ): Promise<CreateTeamEventResult> => {
    try {
      const res = await createTeamEventMutation({
        variables: {
          createTeamEventInput
        }
      });

      if (!res.data?.createTeamEvent) {
        return {
          success: false
        };
      } else {
        return {
          success: true,
          event: res.data.createTeamEvent
        };
      }
    } catch (e: any) {
      return {
        success: false
      };
    }
  };

  return {
    createTeamEvent,
    error
  };
};

export default useCreateTeamEvent;
