import React, { useState } from 'react';

import { EventListInfo } from '../../graphql/queries/eventConnection';
import StyledModal from '../modals/StyledModal';
import EventFormContainer from '../forms/EventFormContainer';
import Calendar from './Calendar';
import useEventConnection from '../../hooks/useEventConnection';
import EventDetailsModal from '../modals/EventDetailsModal';
import EventDetailsContainer from '../eventComps/EventDetailsContainer';

interface ICalendarProps {
  editable?: boolean;
  teamId?: number;
}

const CalendarContainer: React.FC<ICalendarProps> = (props) => {
  const calendarEventConnection = useEventConnection(
    props.teamId
      ? {
          eventFilters: {
            teamId: props.teamId
          }
        }
      : undefined
  );
  const [eventDetailsModalOpen, setEventDetailsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [initialDate, setInitialDate] = useState<Date | undefined>();

  const handleEventClick = (eventId: string) => {
    // open modal in which
    setSelectedEventId(eventId);
    setEventDetailsModalOpen(true);
  };

  const handleDateClick = (d: Date) => {
    if (!props.editable) {
      return;
    }
    setSelectedEventId(undefined);
    setInitialDate(d);
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledModal
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        {isModalOpen && (
          <EventFormContainer
            initialDate={initialDate}
            eventId={selectedEventId}
            teamId={props.teamId}
            disabled={!props.editable}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </StyledModal>
      {selectedEventId && (
        <EventDetailsModal
          eventId={selectedEventId || '-1'}
          isOpen={eventDetailsModalOpen && selectedEventId !== undefined}
          onRequestClose={() => setEventDetailsModalOpen(false)}
        />
      )}
      {
        <Calendar
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          editable={props.editable}
          events={calendarEventConnection.events}
        />
      }
    </>
  );
};

export default CalendarContainer;
