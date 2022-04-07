import {
  DELETE_EVENT,
  DeleteEventData,
  DeletedEventMutationResult
} from './../../graphql/mutations/event/deleteEvent';
import { useMutation, ApolloError } from '@apollo/client';
import { DeleteEventInput } from '../../graphql/mutations/event/deleteEvent';
import { UnknownError, unknownError } from '../../types';

type DeleteEventResult =
  | { success: true; event: DeletedEventMutationResult }
  | { success: false; event?: null; error: ApolloError | UnknownError };

const useDeleteEvent = () => {
  const [deleteEventMutation, { error }] = useMutation<
    DeleteEventData,
    DeleteEventInput
  >(DELETE_EVENT);

  const deleteEvent = async (
    params: DeleteEventInput
  ): Promise<DeleteEventResult> => {
    try {
      const result = await deleteEventMutation({
        variables: {
          ...params
        }
      });

      if (result.data?.deleteEvent) {
        return {
          success: true,
          event: result.data.deleteEvent
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
    deleteEvent,
    error
  };
};

export default useDeleteEvent;
