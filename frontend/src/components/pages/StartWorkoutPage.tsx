import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

const StartWorkoutPage = () => {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <PageContainer>
      <Header>Start a workout</Header>
      <div className="my-2"></div>
      <div className="flex-row md:px-40 lg:px-80 sm:px-10">
        <Link to="template">
          <Button>Use a template</Button>
        </Link>
        <div className="my-2"></div>
        <Link to="blank">
          <Button>Blank</Button>
        </Link>
      </div>
    </PageContainer>
  );
};

export default StartWorkoutPage;
