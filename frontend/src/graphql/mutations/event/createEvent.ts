import { Event } from '../../queries/event';
import { gql } from '@apollo/client';

export interface CreateEventInput {
  name: string;
  description?: string;
  typeId?: number;
  start: Date;
  end: Date;
  teamId: number;
}

export type CreatedEventMutationResult = Pick<
  Event,
  'id' | 'name' | 'description' | 'start' | 'end' | 'team'
>;

export const CREATE_EVENT = gql`
  mutation createEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
      name
      description
      start
      end
      team {
        id
      }
      type {
        id
      }
    }
  }
`;

export interface CreateEventData {
  createEvent: CreatedEventMutationResult | null;
}
