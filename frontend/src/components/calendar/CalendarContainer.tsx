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
import RadioGroup from '../forms/components/RadioGroup';
import { EventListInfo } from '../../graphql/queries/eventConnection';

interface ICalendarProps {
  editable?: boolean;
  teamId?: number;
}

type IDropOption =
  | { value: 'edit'; label: 'Edit' }
  | { value: 'copy'; label: 'Copy' };

const CalendarContainer: React.FC<ICalendarProps> = (props) => {
  const dropOptions: IDropOption[] = [
    { value: 'edit', label: 'Edit' },
    { value: 'copy', label: 'Copy' }
  ];
  const [selectedDropOption, setSelectedDropOption] = useState<IDropOption>({
    value: 'edit',
    label: 'Edit'
  });

  const confirmEdit = useConfirm('editEvent');
  const confirmCopy = useConfirm('copyEvent');

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
  const { editEvent, createEvent } = useEvent();
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

  const handleEditAsync = async (
    event: EventListInfo,
    newStart: Date,
    newEnd: Date
  ) => {
    const confirmed = await confirmEdit.confirm(
      'Are you sure you want to edit the event time?'
    );

    if (!confirmed) {
      return;
    }
    try {
      const result = await editEvent({
        id: event.id,
        start: newStart,
        end: newEnd
      });

      if (result.success) {
        toast('Event edited', { type: 'success' });
      } else {
        toast('Something went wrong', { type: 'error' });
      }
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  const handleCopyAsync = async (
    event: EventListInfo,
    newStart: Date,
    newEnd: Date
  ) => {
    const confirmed = await confirmCopy.confirm(
      'Are you sure you want to copy the event?'
    );

    if (!confirmed) {
      return;
    }
    try {
      const result = await createEvent({
        name: event.name,
        description: event.description,
        typeId: event.type?.id,
        start: newStart,
        end: newEnd,
        teamId: event.team.id
      });
      if (result.success) {
        toast('Event copied', { type: 'success' });
      } else {
        toast('Something went wrong', { type: 'error' });
      }
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  const handleDropped = async (
    event: EventListInfo,
    newStart: Date,
    newEnd: Date
  ) => {
    selectedDropOption.value === 'edit' &&
      (await handleEditAsync(event, newStart, newEnd));
    selectedDropOption.value === 'copy' &&
      (await handleCopyAsync(event, newStart, newEnd));
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
      <div>
        {props.editable && (
          <>
            <h5>Drag behaviour</h5>
            <RadioGroup
              options={dropOptions}
              value={selectedDropOption.value}
              onValueChange={(v) => {
                const dOption = dropOptions.find((o) => o.value === v);
                if (dOption) {
                  setSelectedDropOption(dOption);
                }
              }}
            />
          </>
        )}
      </div>
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
