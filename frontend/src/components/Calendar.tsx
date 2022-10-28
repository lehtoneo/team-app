import React, { useState } from 'react';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EventListInfo } from '../graphql/queries/eventConnection';
import EventForm, { EventFormValues } from './forms/EventForm';
import StyledModal from './modals/StyledModal';
import useEvent from '../hooks/useEvent';
import EventFormContainer from './forms/EventFormContainer';

interface ICalendarProps {
  events: EventListInfo[];
  editable?: boolean;
  teamId?: number;
}

const Calendar: React.FC<ICalendarProps> = (props) => {
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [initialDate, setInitialDate] = useState<Date | undefined>();
  const fullCalendarEvents: EventInput[] = props.events.map((e) => {
    return {
      id: e.id,
      start: e.start,
      end: e.end,
      title: e.name
    };
  });

  const handleEventClick = (e: EventClickArg) => {
    // open modal in which
    if (!props.editable) {
      return;
    }
    setSelectedEventId(e.event.id);
    setInitialDate(undefined);
    setIsEventFormModalOpen(true);
  };

  const handleDateClick = (d: DateClickArg) => {
    if (!props.editable) {
      return;
    }
    setSelectedEventId(undefined);
    setInitialDate(d.date);
    setIsEventFormModalOpen(true);
  };

  return (
    <>
      <StyledModal
        onRequestClose={() => setIsEventFormModalOpen(false)}
        isOpen={isEventFormModalOpen}
      >
        {isEventFormModalOpen && (
          <EventFormContainer
            initialDate={initialDate}
            eventId={selectedEventId}
            teamId={props.teamId}
            disabled={!props.editable}
            onSuccess={() => setIsEventFormModalOpen(false)}
          />
        )}
      </StyledModal>
      {
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          events={fullCalendarEvents}
        />
      }
    </>
  );
};

export default Calendar;
