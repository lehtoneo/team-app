import { useQuery } from '@apollo/client';
import {
  OneEventInput,
  EventQueryData,
  EVENT_QUERY
} from '../../graphql/queries/event';
import useSaveEventAttendance from './useSaveEventAttendance';
import useCreateEvent from './useCreateEvent';
import useEditEvent from './useEditEvent';
import useDeleteEvent from './useDeleteEvent';
import { EditEventInput } from '../../graphql/mutations/event/editEvent';
import { CreateEventInput } from '../../graphql/mutations/event/createEvent';

const useEvent = (args?: OneEventInput) => {
  const { deleteEvent, error: deleteEventError } = useDeleteEvent();
  const { createEvent, error: createEventError } = useCreateEvent();
  const { editEvent, error: editEventError } = useEditEvent();
  const { saveAttendance, error: saveAttendanceError } = useSaveEventAttendance(
    { eventId: args?.id || '-1' }
  );

  const { data, loading, error } = useQuery<EventQueryData, OneEventInput>(
    EVENT_QUERY,
    {
      skip: !args,
      variables: args ? { ...args } : { id: '-1' },
      onError: (e) => {
        console.log(e);
      },
      onCompleted: (d) => {
        // console.log({ d });
      }
    }
  );
  return {
    event: data?.oneEvent,
    loading: loading,
    found:
      data?.oneEvent === undefined
        ? undefined
        : data.oneEvent === null
        ? false
        : true,
    error,
    saveAttendance,
    saveAttendanceError,
    createEvent,
    createEventError,
    editEvent,
    editEventError,
    deleteEvent,
    deleteEventError
  };
};

export default useEvent;
