import { gql } from '@apollo/client';
import { EventType } from '../../queries/oneEventType';

export interface CreateEventTypeInput {
  id?: number;
  name: string;
  color?: string;
  teamId: number;
}

export type EventTypeMutationResult = Pick<
  EventType,
  'id' | 'name' | 'color' | 'teamId'
>;

export const CREATE_OR_UPDATE_EVENT_TYPE = gql`
  mutation createOrUpdateEventType(
    $createOrUpdateEventTypeInput: CreateEventInput!
  ) {
    createOrUpdateEventType(
      createOrUpdateEventTypeInput: $createOrUpdateEventTypeInput
    ) {
      id
      name
      color
      teamId
    }
  }
`;

export interface EventTypeMutationData {
  createOrUpdateEventType: EventTypeMutationResult | null;
}
