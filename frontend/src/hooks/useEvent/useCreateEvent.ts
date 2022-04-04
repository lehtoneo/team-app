import {
  CreatedEventMutationResult,
  CreateEventData,
  CreateEventInput,
  CREATE_EVENT
} from '../../graphql/mutations/createEvent';
import { useMutation } from '@apollo/client';
import { TEAM_QUERY } from '../../graphql/queries/team';

type CreateEventResult =
  | { success: true; event: CreatedEventMutationResult }
  | { success: false; event?: null };

const useCreateEvent = () => {
  const [createEventMutation, { error }] = useMutation<
    CreateEventData,
    { createEventInput: CreateEventInput }
  >(CREATE_EVENT, { refetchQueries: [TEAM_QUERY] });

  const createEvent = async (
    createEventInput: CreateEventInput
  ): Promise<CreateEventResult> => {
    try {
      const res = await createEventMutation({
        variables: {
          createEventInput
        }
      });

      if (!res.data?.createEvent) {
        return {
          success: false
        };
      } else {
        return {
          success: true,
          event: res.data.createEvent
        };
      }
    } catch (e: any) {
      return {
        success: false
      };
    }
  };

  return {
    createEvent,
    error
  };
};

export default useCreateEvent;
