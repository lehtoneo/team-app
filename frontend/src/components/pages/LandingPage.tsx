import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import useWorkoutConnection from '../../hooks/useWorkoutConnection';
import Button from '../Button';
import WorkoutList from '../WorkoutList';
import PageContainer from './components/PageContainer';
import Header from '../Header';
const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  return (
    <>
      <Header>Hi {userFirstName}!</Header>
      <div className="flex-row">
        <div className="flex justify-center p-2">
          <Link to="/start-workout">
            <Button className="justify-center">Start a new workout</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

const LandingPage = () => {
  const { workouts } = useWorkoutConnection();
  const { isLoggedIn, currentUser } = useCurrentUser();
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  if (isLoggedIn) {
    return (
      <PageContainer>
        <LoggedInLandingPage userFirstName={currentUser?.firstname} />
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <Header>Welcome to workout planner</Header>
      <WorkoutList workouts={workouts} />
    </PageContainer>
  );
};

export default LandingPage;
