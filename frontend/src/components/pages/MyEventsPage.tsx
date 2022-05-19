import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import MyUpcomingEvents from '../MyUpcomingEvents';
import PageContainer from './components/PageContainer';

const MyEventsPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const headerText = `Hi ${currentUser?.firstname || ''}!`;
  return (
    <PageContainer header={headerText}>
      <MyUpcomingEvents />
    </PageContainer>
  );
};

export default MyEventsPage;
