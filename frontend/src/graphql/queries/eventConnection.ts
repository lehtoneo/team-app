import { gql } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { Event } from './event';
import { EventType } from './oneEventType';

type EventListInfoEventType = Pick<EventType, 'id' | 'color'>;

type EventListInfoBasicInfo = Pick<
  Event,
  | 'description'
  | 'id'
  | 'name'
  | 'team'
  | 'currentUserEventAttendance'
  | 'start'
  | 'end'
>;
export interface EventListInfo extends EventListInfoBasicInfo {
  type?: EventListInfoEventType;
}

type EventConnection = IConnection<EventListInfo>;

interface FilterDateInput {
  max?: Date;
  min?: Date;
}

export interface FilterEventsInput {
  teamId?: number;
  start?: FilterDateInput;
  end?: FilterDateInput;
}

export interface EventConnectionInput {
  paginationInput?: PaginationInput;
  eventFilters?: FilterEventsInput;
}

export const EVENT_CONNECTION = gql`
  query eventConnection(
    $paginationInput: PaginationInput
    $eventFilters: FilterEventsInput
  ) {
    eventConnection(
      paginationInput: $paginationInput
      filterEventsInput: $eventFilters
    ) {
      edges {
        node {
          id
          description
          name
          start
          end
          team {
            id
            name
          }
          type {
            id
            color
          }
          currentUserEventAttendance {
            id
            createdAt
            attendance
            userId
            reason
          }
        }
        cursor
      }

      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export interface EventConnectionData {
  eventConnection?: EventConnection | null;
}
