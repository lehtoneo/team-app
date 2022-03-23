import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useWorkoutConnection from '../../hooks/useWorkoutConnection';
import Button from '../Button';
import WorkoutList from '../WorkoutList';

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl">{children}</h1>
    </div>
  );
};
const Container = ({ children }: { children?: React.ReactNode }) => {
  return <div>{children} </div>;
};

const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  return (
    <>
      <Header>Hi {userFirstName}!</Header>
      <div className="flex-row">
        <div className="flex justify-center p-2">
          <Button title="Start a new workout" className="justify-center" />
        </div>
      </div>
    </>
  );
};

const LandingPage = () => {
  const { workouts } = useWorkoutConnection();
  const { isLoggedIn, currentUser } = useCurrentUser();
  if (isLoggedIn === undefined) {
    return <Container></Container>;
  }
  if (isLoggedIn) {
    return (
      <Container>
        <LoggedInLandingPage userFirstName={currentUser?.firstname} />
      </Container>
    );
  }
  return (
    <Container>
      <Header>Welcome to workout planner</Header>
      <WorkoutList workouts={workouts} />
    </Container>
  );
};

export default LandingPage;
