import React from 'react';
import {
  WorkoutConnectionData,
  WORKOUT_CONNECTION
} from '../graphql/queries/workoutConnection';
import { useQuery } from '@apollo/client';

import { PaginationInput } from '../graphql/commonTypes';

const useWorkoutConnection = (args?: PaginationInput) => {
  const { data, loading } = useQuery<WorkoutConnectionData>(WORKOUT_CONNECTION, {
    variables: {
      paginationInput: args
    },
    onError: (e) => {
      console.log(e);
    }
  });

  return {
    workouts: data?.workoutConnection?.edges.map((edge) => edge.node) || [],
    loading
  };
};

export default useWorkoutConnection;
