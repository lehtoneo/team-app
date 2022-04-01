import { gql } from '@apollo/client';
import { IConnection, PaginationInput, Event } from '../commonTypes';

export type EventListInfo = Pick<Event, 'description' | 'id' | 'name' | 'team'>;

type EventConnection = IConnection<EventListInfo>;

interface FilterEventsInput {}

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
          team {
            id
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
