import { gql } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { Event } from './event';
import { EventType } from './oneEventType';
export type EventTypeListInfo = Pick<EventType, 'color' | 'id' | 'name'>;

type EventTypeConnection = IConnection<EventTypeListInfo>;

export interface FilterEventTypesInput {
  teamId: number;
}

export interface EventTypeConnectionInput {
  paginationInput?: PaginationInput;
  filterEventTypes?: FilterEventTypesInput;
}

export const EVENT_TYPE_CONNECTION = gql`
  query eventTypeConnection(
    $paginationInput: PaginationInput
    $filterEventTypes: FilterEventTypesInput!
  ) {
    eventTypeConnection(
      paginationInput: $paginationInput
      filterEventTypes: $filterEventTypes
    ) {
      edges {
        node {
          id
          color
          name
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

export interface EventTypeConnectionData {
  eventTypeConnection?: EventTypeConnection | null;
}
