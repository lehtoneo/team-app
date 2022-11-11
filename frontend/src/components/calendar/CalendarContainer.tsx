import React, { useEffect, useState } from 'react';

import { EventListInfo } from '../../graphql/queries/eventConnection';
import StyledModal from '../modals/StyledModal';
import EventFormContainer from '../forms/EventFormContainer';
import Calendar from './Calendar';
import useEventConnection from '../../hooks/useEventConnection';
import EventDetailsModal from '../modals/EventDetailsModal';
import { useSearchParams } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';
import useConfirm from '../../hooks/useConfirm';
import { toast } from 'react-toastify';
interface ICalendarProps {
  editable?: boolean;
  teamId?: number;
}

const CalendarContainer: React.FC<ICalendarProps> = (props) => {
  const confirm = useConfirm();
  let [searchParams, setSearchParams] = useSearchParams();
  const calendarEventConnection = useEventConnection(
    props.teamId
      ? {
          eventFilters: {
            teamId: props.teamId
          }
        }
      : undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(
    searchParams.get('eventId') || undefined
  );
  const [initialDate, setInitialDate] = useState<Date | undefined>();
  const { editEvent } = useEvent();
  useEffect(() => {
    setSelectedEventId(searchParams.get('eventId') || undefined);
  }, [searchParams]);
  const handleEventClick = (eventId: string) => {
    // open modal in which
    setSearchParams({ eventId });
  };

  const handleEventClose = () => {
    searchParams.delete('eventId');
    setSearchParams(searchParams);
  };

  const handleDropped = async (
    eventId: string,
    newStart: Date,
    newEnd: Date
  ) => {
    const confirmed = await confirm.confirm(
      'Are you sure you want to edit the event?'
    );
    if (!confirmed) {
      return;
    }
    try {
      await editEvent({ id: eventId, start: newStart, end: newEnd });

      toast('Event edited', { type: 'success' });
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
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
          eventId={selectedEventId}
          isOpen={selectedEventId !== undefined}
          onRequestClose={handleEventClose}
        />
      )}
      {
        <Calendar
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          onDropped={handleDropped}
          editable={props.editable}
          events={calendarEventConnection.events}
        />
      }
    </>
  );
};

export default CalendarContainer;
