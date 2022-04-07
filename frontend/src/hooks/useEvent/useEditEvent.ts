import { unknownError } from './../../types/index';
import {
  EditedEventMutationResult,
  EditEventInput,
  EditEventData,
  EDIT_EVENT
} from '../../graphql/mutations/event/editEvent';
import { ApolloError, useMutation } from '@apollo/client';
import { TEAM_QUERY } from '../../graphql/queries/team';
import { UnknownError } from '../../types';
import { EVENT_QUERY } from '../../graphql/queries/event';

type EditEventResult =
  | { success: true; event: EditedEventMutationResult }
  | { success: false; event?: null; error: ApolloError | UnknownError };

const useEditEvent = () => {
  const [editEventMutation, { error }] = useMutation<
    EditEventData,
    { editEventInput: EditEventInput }
  >(EDIT_EVENT, { refetchQueries: [EVENT_QUERY] });

  const editEvent = async (
    editEventInput: EditEventInput
  ): Promise<EditEventResult> => {
    try {
      const res = await editEventMutation({
        variables: {
          editEventInput
        }
      });

      if (!res.data?.editEvent) {
        return {
          success: false,
          error: unknownError
        };
      } else {
        return {
          success: true,
          event: res.data.editEvent
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
    editEvent,
    error
  };
};

export default useEditEvent;
