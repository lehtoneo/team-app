import { gql } from '@apollo/client';
import { User } from './me';
import { Team } from './team';

export type EventAttendanceUser = Pick<User, 'id' | 'firstname'>;

export interface UserEventAttendace {
  id: string;
  createdAt: Date;
  attendance: boolean;
  reason?: string;
  user: EventAttendanceUser;
}

export type EventTeam = Pick<Team, 'id' | 'name'>;

export interface Event {
  id: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  team: EventTeam;
  currentUserEventAttendance: UserEventAttendace | null;
  userAttendances: UserEventAttendace[];
}

export interface OneEventInput {
  id: number;
}

export const EVENT_QUERY = gql`
  query oneEvent($id: ID!) {
    oneEvent(id: $id) {
      id
      name
      description
      start
      end
      team {
        id
        name
      }
      userAttendances {
        id
        createdAt
        user {
          id
          firstname
        }
        attendance
        reason
      }
      currentUserEventAttendance {
        id
        createdAt
        attendance
        user {
          id
          firstname
        }
        reason
      }
    }
  }
`;

export interface EventQueryData {
  oneEvent?: Event | null;
}
