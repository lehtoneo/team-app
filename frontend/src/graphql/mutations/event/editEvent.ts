import { CreateEventInput } from './createEvent';
import { gql } from '@apollo/client';
import { Event } from '../../queries/event';

export interface EditEventInput
  extends Omit<CreateEventInput, 'teamId' | 'name'> {
  id: string;
  name?: string;
}

export type EditedEventMutationResult = Pick<
  Event,
  'id' | 'name' | 'description' | 'start' | 'end' | 'team'
>;

export const EDIT_EVENT = gql`
  mutation editEvent($editEventInput: EditEventInput!) {
    editEvent(editEventInput: $editEventInput) {
      id
      name
      description
      start
      end
      team {
        id
      }
    }
  }
`;

export interface EditEventData {
  editEvent: EditedEventMutationResult | null;
}
