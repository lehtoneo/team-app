import React from 'react';
import useEventConnection from '../hooks/useEventConnection';
import EventList from './EventList';
import Header from './Header';

const MyEvents: React.FC = () => {
  const { events } = useEventConnection({ paginationInput: { first: 20 } });
  return (
    <div>
      <Header size={3}>Your upcoming Events:</Header>
      <EventList events={events} />
    </div>
  );
};

export default MyEvents;
