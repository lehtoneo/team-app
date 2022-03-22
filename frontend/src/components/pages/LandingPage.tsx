import React from 'react';
import useWorkoutConnection from '../../hooks/useWorkoutConnection';
import WorkoutList from '../WorkoutList';

const LandingPage = () => {
  const { workouts } = useWorkoutConnection();
  return (
    <div>
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default LandingPage;
