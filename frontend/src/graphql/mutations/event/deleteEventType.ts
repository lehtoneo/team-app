import { gql, useMutation } from '@apollo/client';
import { EventType } from '../../queries/oneEventType';

export interface DeleteEventTypeInput {
  id: number;
}

export type DeletedEventTypeMutationResult = Pick<EventType, 'id'>;

export const DELETE_EVENT_TYPE = gql`
  mutation deleteEventType($id: Int!) {
    deleteEventType(id: $id) {
      id
    }
  }
`;

export interface DeleteEventTypeData {
  deleteEventType: DeletedEventTypeMutationResult | null;
}
export function useDeleteEventTypeMutation() {
  return useMutation<DeleteEventTypeData, DeleteEventTypeInput>(
    DELETE_EVENT_TYPE
  );
}
