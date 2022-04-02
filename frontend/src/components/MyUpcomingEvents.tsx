import React from 'react';
import useEventConnection from '../hooks/useEventConnection';
import EventList from './EventList';
import Header from './Header';

const MyUpcomingEvents: React.FC = () => {
  const { events } = useEventConnection({
    paginationInput: { first: 20 },
    eventFilters: { futureEventsOnly: true }
  });
  return (
    <div>
      <Header size={3}>Your upcoming Events:</Header>
      <EventList events={events} />
    </div>
  );
};

export default MyUpcomingEvents;
