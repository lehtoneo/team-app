import { gql } from '@apollo/client';
import { Event } from '../../queries/event';

export interface DeleteEventInput {
  id: number;
}

export type DeletedEventMutationResult = Pick<Event, 'id'>;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export interface DeleteEventData {
  deleteEvent: DeletedEventMutationResult | null;
}
