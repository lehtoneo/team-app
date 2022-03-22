import React from 'react';
import useWorkoutConnection from '../../hooks/useWorkoutConnection';
import WorkoutList from '../WorkoutList';

const LandingPage = () => {
  const { workouts } = useWorkoutConnection();
  return (
    <div>
      <h1 className="text-4xl self-center">Welcome to workout planner</h1>
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default LandingPage;
