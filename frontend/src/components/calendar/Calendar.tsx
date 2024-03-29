import React, { useState } from 'react';
import FullCalendar, {
  DateInput,
  DatesSetArg,
  EventClickArg,
  EventDropArg,
  EventInput
} from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EventListInfo } from '../../graphql/queries/eventConnection';

interface ICalendarProps {
  events: EventListInfo[];
  onEventClick: (eventId: string) => any;
  onDateClick: (date: Date) => any;
  onDropped?: (event: EventListInfo, newStart: Date, newEnd: Date) => any;
  editable?: boolean;
  teamId?: number;
  onDatesSet?: (start: Date, end: Date) => any;
  initialDate?: DateInput;
}

const Calendar: React.FC<ICalendarProps> = (props) => {
  const fullCalendarEvents: EventInput[] = props.events.map((e) => {
    return {
      id: e.id.toString(),
      start: e.start,
      end: e.end,
      title: e.name,
      color: e.type?.color,
      display: 'block'
    };
  });

  const handleDatesSet = (e: DatesSetArg) => {
    console.log(e);
    props.onDatesSet && props.onDatesSet(e.start, e.end);
  };
  const handleEventClick = (e: EventClickArg) => {
    props.onEventClick(e.event.id);
  };

  const handleDateClick = (d: DateClickArg) => {
    props.onDateClick(d.date);
  };

  const handleDrop = (arg: EventDropArg) => {
    if (props.onDropped === undefined) {
      return;
    }
    const event = props.events.find((e) => e.id.toString() === arg.event.id);
    console.log(arg);
    // call onDropped if start and end are dfined
    event &&
      arg.event.start &&
      arg.event.end &&
      props.onDropped(event, arg.event.start, arg.event.end);
  };

  return (
    <FullCalendar
      firstDay={1}
      plugins={[dayGridPlugin, interactionPlugin]}
      datesSet={handleDatesSet}
      eventClick={handleEventClick}
      dateClick={handleDateClick}
      initialDate={props.initialDate}
      editable={props.editable}
      eventDrop={handleDrop}
      droppable={props.editable}
      selectable={false}
      events={fullCalendarEvents}
    />
  );
};

export default Calendar;
