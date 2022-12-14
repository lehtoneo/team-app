import { gql } from '@apollo/client';
import { User } from './me';
import { EventType } from './oneEventType';
import { Team } from './team';

export type EventAttendanceUser = Pick<User, 'id' | 'firstname'>;

export interface UserEventAttendace {
  id: string;
  createdAt: Date;
  attendance: boolean;
  reason?: string;
  user: EventAttendanceUser;
}

export type EventTeam = Pick<Team, 'id' | 'name' | 'currentUserTeamMembership'>;

export interface Event {
  id: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  team: EventTeam;
  type?: EventType;
  currentUserEventAttendance: UserEventAttendace | null;
  userAttendances: UserEventAttendace[];
}

export interface OneEventInput {
  id: string;
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
        currentUserTeamMembership {
          id
          role
        }
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
      type {
        id
        name
        color
        teamId
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
