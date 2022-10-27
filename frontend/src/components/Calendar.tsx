import React from 'react';

import FullCalendar, {
  EventClickArg,
  EventInput,
  EventSourceInput
} from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EventListInfo } from '../graphql/queries/eventConnection';

interface ICalendarProps {
  events: EventListInfo[];
}

const Calendar: React.FC<ICalendarProps> = (props) => {
  const fullCalendarEvents: EventInput[] = props.events.map((e) => {
    return {
      id: e.id,
      start: e.start,
      end: e.end,
      title: e.name
    };
  });
  console.log({ fullCalendarEvents });

  const handleEventClick = (e: EventClickArg) => {
    console.log({ e });
    // open modal in which
  };

  const handleDateClick = (d: DateClickArg) => {
    // open modal in which an event can be created
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventClick={handleEventClick}
      dateClick={handleDateClick}
      events={props.events}
    />
  );
};

export default Calendar;
