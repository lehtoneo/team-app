import React from 'react';
import { Workout } from '../graphql/commonTypes';

interface IWorkoutListProps {
  workouts: Workout[];
}

const WorkoutList = (props: IWorkoutListProps) => {
  return (
    <div>
      {props.workouts.map((workout) => {
        return (
          <div key={workout.id}>
            {workout.description}
            <br></br>
            {workout.done ? 'Tehty' : 'Ei tehty'}
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutList;
