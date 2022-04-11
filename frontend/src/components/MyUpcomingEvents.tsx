import moment from 'moment';
import React from 'react';
import useEventConnection from '../hooks/useEventConnection';
import EventList from './EventList';
import Header from './Header';

const MyUpcomingEvents: React.FC = () => {
  const today = moment();
  const now = moment();
  const todayStart = new Date(today.startOf('day').toISOString());
  const todayEnd = new Date(today.endOf('day').toISOString());
  const { events: eventsToday, loading: loadingEventsToday } =
    useEventConnection({
      paginationInput: { first: 20 },
      eventFilters: {
        start: {
          min: todayStart,
          max: todayEnd
        }
      }
    });

  const tomorrow = moment().add(1, 'days');
  const tomorrowStart = new Date(tomorrow.startOf('day').toString());
  const tomorrowEnd = new Date(tomorrow.endOf('day').toString());

  const { events: eventsTomorrow, loading: loadingEventsTomorrow } =
    useEventConnection({
      paginationInput: { first: 20 },
      eventFilters: {
        start: {
          min: tomorrowStart,
          max: tomorrowEnd
        }
      }
    });
  const { events: restOfUpcomingEvents } = useEventConnection({
    paginationInput: { first: 20 },
    eventFilters: {
      start: {
        min: tomorrowEnd
      }
    }
  });
  return (
    <div>
      <Header size={3}>Your upcoming Events</Header>
      <Header size={2}>Today</Header>
      <EventList events={eventsToday} loading={loadingEventsToday} />
      {eventsToday.length === 0 && !loadingEventsToday && (
        <div className="text-lg">No events today</div>
      )}
      {eventsTomorrow.length > 0 && (
        <>
          <Header size={2}>Tomorrow</Header>
          <EventList events={eventsTomorrow} loading={loadingEventsToday} />
        </>
      )}
      {restOfUpcomingEvents.length > 0 && (
        <>
          <Header size={2}>Rest of upcoming events</Header>
          <EventList events={restOfUpcomingEvents} />
        </>
      )}
    </div>
  );
};

export default MyUpcomingEvents;
