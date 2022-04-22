import { gql } from '@apollo/client';
import { UserEventAttendace } from '../queries/event';

export interface SaveAttendanceInput {
  userId?: number;
  eventId: number;
  attendance: boolean;
  reason?: string;
}

export type SaveAttendanceMutationResult = UserEventAttendace;

export const SAVE_ATTENDANCE = gql`
  mutation saveAttendance($saveAttendanceInput: SaveAttendanceInput!) {
    saveAttendance(saveAttendanceInput: $saveAttendanceInput) {
      id
      createdAt
      userId
      attendance
      reason
    }
  }
`;

export interface SaveAttendanceData {
  saveAttendance: SaveAttendanceMutationResult | null;
}
