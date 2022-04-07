import { gql } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { Event } from './event';
export type EventListInfo = Pick<
  Event,
  | 'description'
  | 'id'
  | 'name'
  | 'team'
  | 'currentUserEventAttendance'
  | 'start'
>;

type EventConnection = IConnection<EventListInfo>;

interface FilterDateInput {
  max?: Date;
  min?: Date;
}

interface FilterEventsInput {
  futureEventsOnly?: boolean;
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
          team {
            id
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
