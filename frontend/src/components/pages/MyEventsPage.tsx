import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useEventConnection from '../../hooks/useEventConnection';
import CalendarContainer from '../calendar/CalendarContainer';
import Header from '../Header';
import MyUpcomingEvents from '../MyUpcomingEvents';
import PageContainer from './components/PageContainer';

const MyEventsPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const headerText = `Hi ${currentUser?.firstname || ''}!`;

  const calendarEventConnetion = useEventConnection();
  return (
    <PageContainer header={headerText}>
      <MyUpcomingEvents />
      <Header>Calendar</Header>
      <CalendarContainer />
    </PageContainer>
  );
};

export default MyEventsPage;
