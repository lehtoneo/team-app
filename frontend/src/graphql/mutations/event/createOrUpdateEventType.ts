import { gql, useMutation } from '@apollo/client';
import { EVENT_TYPE_CONNECTION } from '../../queries/eventTypeConnection';
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
    $createOrUpdateEventTypeInput: CreateOrUpdateEventTypeInput!
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

export function useCreateOrUpdateEventMutation() {
  return useMutation<
    EventTypeMutationData,
    { createOrUpdateEventTypeInput: CreateEventTypeInput }
  >(CREATE_OR_UPDATE_EVENT_TYPE, { refetchQueries: [EVENT_TYPE_CONNECTION] });
}
