import { TEAM_QUERY } from './../../graphql/queries/team';
import { Event } from './../../graphql/queries/event';
import {
  SaveAttendanceData,
  SaveAttendanceInput
} from './../../graphql/mutations/saveAttendance';
import { useMutation } from '@apollo/client';
import {
  SaveAttendanceMutationResult,
  SAVE_ATTENDANCE
} from '../../graphql/mutations/saveAttendance';

type SaveAttendanceResult =
  | { success: true; userEventAttendance: SaveAttendanceMutationResult }
  | { success: false; userEventAttendance?: null };
const useSaveEventAttendance = ({ eventId }: { eventId: number }) => {
  const [saveAttendanceMutation, { error }] = useMutation<
    SaveAttendanceData,
    { saveAttendanceInput: SaveAttendanceInput }
  >(SAVE_ATTENDANCE, { refetchQueries: [TEAM_QUERY] });

  const saveAttendance = async (
    saveAttendanceInput: Omit<SaveAttendanceInput, 'eventId'>
  ): Promise<SaveAttendanceResult> => {
    try {
      const res = await saveAttendanceMutation({
        variables: {
          saveAttendanceInput: {
            ...saveAttendanceInput,
            eventId
          }
        }
      });

      if (!res.data?.saveAttendance) {
        return {
          success: false
        };
      } else {
        return {
          success: true,
          userEventAttendance: res.data.saveAttendance
        };
      }
    } catch (e) {
      return {
        success: false
      };
    }
  };

  return {
    saveAttendance,
    error
  };
};

export default useSaveEventAttendance;
