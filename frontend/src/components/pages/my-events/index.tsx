import React, { useState } from 'react';
import useCurrentUser from '../../../hooks/useCurrentUser';
import CalendarContainer from '../../calendar/CalendarContainer';
import CheckBox from '../../forms/components/CheckBox';
import Header from '../../Header';
import MyUpcomingEvents from './MyUpcomingEvents';
import PageContainer from '../components/PageContainer';

const MyEventsPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const [showCalendar, setShowCalendar] = useState(true);
  const [showList, setShowList] = useState(false);
  const headerText = `Hi ${currentUser?.firstname || ''}!`;

  return (
    <PageContainer header={headerText}>
      <CheckBox
        value={showList}
        onValueChange={(val) => setShowList(val)}
        label="Show list"
      />
      <CheckBox
        value={showCalendar}
        onValueChange={(val) => setShowCalendar(val)}
        label="Show calendar"
      />
      {showList && (
        <>
          <Header size={3}>Your upcoming Events</Header>
          <MyUpcomingEvents />
        </>
      )}

      {showCalendar && (
        <>
          <Header>Calendar</Header>
          <CalendarContainer editable={false} />
        </>
      )}
    </PageContainer>
  );
};

export default MyEventsPage;
