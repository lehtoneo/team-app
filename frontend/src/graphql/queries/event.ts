import { gql } from '@apollo/client';
import { Team } from './team';

export interface UserEventAttendace {
  id: string;
  createdAt: Date;
  userId: number;
  attendance: boolean;
  reason?: string;
}

export type EventTeam = Pick<Team, 'id' | 'name'>;

export interface Event {
  id: string;
  name: string;
  description?: string;
  start: Date;
  end: Date;
  team: EventTeam;
  userAttendances: UserEventAttendace[];
}

export interface EventInput {
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
        userId
        attendance
        reason
      }
    }
  }
`;

export interface EventQueryData {
  oneEvent?: Event | null;
}
