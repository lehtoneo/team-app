import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

const OwnTeamsPage = () => {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <PageContainer>
      <Header>My teams</Header>
      <div className="my-2"></div>
      <div className="flex-row md:px-40 lg:px-80 sm:px-10"></div>
    </PageContainer>
  );
};

export default OwnTeamsPage;
