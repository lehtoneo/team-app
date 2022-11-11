import moment from 'moment';
import React from 'react';
import EventPaginatedList from './eventComps/EventPaginatedList';
import Header from './Header';

const MyUpcomingEvents: React.FC = () => {
  const today = moment();
  const todayStart = new Date(today.startOf('day').toISOString());
  const todayEnd = new Date(today.endOf('day').toISOString());
  const todayEventFilters = {
    start: {
      min: todayStart,
      max: todayEnd
    }
  };

  const tomorrow = moment().add(1, 'days');
  const tomorrowStart = new Date(tomorrow.startOf('day').toString());
  const tomorrowEnd = new Date(tomorrow.endOf('day').toString());
  const tomorrowFilters = {
    start: {
      min: tomorrowStart,
      max: tomorrowEnd
    }
  };

  const restFilters = {
    start: {
      min: tomorrowEnd
    }
  };

  return (
    <div>
      <Header size={2} center={false}>
        Today
      </Header>
      <EventPaginatedList eventFilters={todayEventFilters} />
      <Header size={2} center={false}>
        Tomorrow
      </Header>
      <EventPaginatedList eventFilters={tomorrowFilters} />
      <Header size={2} center={false}>
        Rest of upcoming events
      </Header>
      <EventPaginatedList eventFilters={restFilters} />
    </div>
  );
};

export default MyUpcomingEvents;
