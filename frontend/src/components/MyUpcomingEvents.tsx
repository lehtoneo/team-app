import React from 'react';
import useEventConnection from '../hooks/useEventConnection';
import EventList from './EventList';
import Header from './Header';

const MyUpcomingEvents: React.FC = () => {
  const { events, loading } = useEventConnection({
    paginationInput: { first: 20 },
    eventFilters: { futureEventsOnly: true }
  });
  return (
    <div>
      <Header size={3}>Your upcoming Events:</Header>
      {events.length === 0 && !loading && (
        <div className="text-lg">You have no upcoming events</div>
      )}
      <EventList events={events} loading={loading} />
    </div>
  );
};

export default MyUpcomingEvents;
