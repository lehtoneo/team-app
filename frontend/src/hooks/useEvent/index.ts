import { TeamQueryData, TEAM_QUERY } from '../../graphql/queries/team';

import { useQuery } from '@apollo/client';
import { GetOneTeamInput } from '../../graphql/queries/team';
import {
  EventInput,
  EventQueryData,
  EVENT_QUERY
} from '../../graphql/queries/event';
import useSaveEventAttendance from './useSaveEventAttendance';
import useCreateEvent from './useCreateEvent';
import useEditEvent from './useEditEvent';

const useEvent = (args: EventInput) => {
  const { createEvent, error: createEventError } = useCreateEvent();
  const { editEvent, error: editEventError } = useEditEvent();
  const { saveAttendance, error: saveAttendanceError } = useSaveEventAttendance(
    { eventId: args.id }
  );
  const { data, loading, error } = useQuery<EventQueryData, EventInput>(
    EVENT_QUERY,
    {
      variables: {
        ...args
      },
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
    loading: data?.oneEvent === undefined,
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
    editEventError
  };
};

export default useEvent;
