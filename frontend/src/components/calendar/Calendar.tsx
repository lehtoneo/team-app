import React, { useState } from 'react';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EventListInfo } from '../../graphql/queries/eventConnection';

interface ICalendarProps {
  events: EventListInfo[];
  onEventClick: (eventId: string) => any;
  onDateClick: (date: Date) => any;
  editable?: boolean;
  teamId?: number;
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

  const handleEventClick = (e: EventClickArg) => {
    console.log(e);
    props.onEventClick(e.event.id);
  };

  const handleDateClick = (d: DateClickArg) => {
    props.onDateClick(d.date);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventClick={handleEventClick}
      dateClick={handleDateClick}
      // editable=true because it sets cursor hovering events
      editable
      events={fullCalendarEvents}
    />
  );
};

export default Calendar;
