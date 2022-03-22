import { gql } from '@apollo/client';
import { IConnection, Workout } from '../commonTypes';

type WorkoutListInfo = Pick<Workout, 'description' | 'id' | 'done'>;

type WorkoutConnection = IConnection<WorkoutListInfo>;

export const WORKOUT_CONNECTION = gql`
  query workoutConnection($paginationInput: PaginationInput) {
    workoutConnection(paginationInput: $paginationInput) {
      edges {
        node {
          id
          description
          done
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

export interface WorkoutConnectionData {
  workoutConnection?: WorkoutConnection | null;
}
