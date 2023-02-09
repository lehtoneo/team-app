import React, { useEffect, useState } from 'react';

import moment from 'moment';
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

  const searchParamsMonth = searchParams.get('month');
  const initialCalendarDate = searchParamsMonth;
  console.log({ initialCalendarDate });
  const calendarEventConnection = useEventConnection({
    paginationInput: {
      first: 2
    },
    eventFilters: {
      teamId: props.teamId
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>(
    searchParams.get('eventId')
      ? Number(searchParams.get('eventId'))
      : undefined
  );
  const [initialFormDate, setInitialFormDate] = useState<Date | undefined>();
  const { editEvent } = useEvent();
  useEffect(() => {
    setSelectedEventId(
      searchParams.get('eventId')
        ? Number(searchParams.get('eventId'))
        : undefined
    );
  }, [searchParams]);
  const handleEventClick = (eventId: string) => {
    // open modal in which
    searchParams.delete('eventId');
    searchParams.append('eventId', eventId);
    setSearchParams(searchParams);
  };

  const handleEventClose = () => {
    searchParams.delete('eventId');
    setSearchParams(searchParams);
  };

  const handleDatesChange = (start: Date, end: Date) => {
    calendarEventConnection.refetch({
      paginationInput: {
        first: 10000
      },
      eventFilters: {
        teamId: props.teamId,
        start: {
          min: start,
          max: end
        }
      }
    });
    searchParams.delete('month');
    searchParams.append(
      'month',
      moment(start).add(8, 'days').format('yyyy-MM-DD')
    );
    setSearchParams(searchParams);
  };

  const handleDropped = async (
    eventId: string,
    newStart: Date,
    newEnd: Date
  ) => {
    const confirmed = await confirm.confirm(
      'Are you sure you want to edit the event time?'
    );
    if (!confirmed) {
      return;
    }
    try {
      await editEvent({ id: Number(eventId), start: newStart, end: newEnd });

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
    setInitialFormDate(d);
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
            initialDate={initialFormDate}
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
          onDatesSet={handleDatesChange}
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          onDropped={handleDropped}
          editable={props.editable}
          initialDate={initialCalendarDate || undefined}
          events={calendarEventConnection.events}
        />
      }
    </>
  );
};

export default CalendarContainer;
