import { gql } from '@apollo/client';

export interface EventType {
  id: number;
  color?: string;
  name: string;
  teamId: string;
}

export interface OneEventTypeInput {
  id: number;
}
export type EventTypeQueryResult = Pick<
  EventType,
  'id' | 'name' | 'color' | 'teamId'
>;

export const ONE_EVENT_TYPE = gql`
  query oneEventType($id: ID!) {
    oneEventType(id: $id) {
      id
      name
      color
      teamId
    }
  }
`;

export interface OneEventTypeQueryData {
  oneEventType: EventTypeQueryResult | null;
}
