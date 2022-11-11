import React from 'react';
import { toast } from 'react-toastify';
import useEvent from '../../hooks/useEvent';
import LoadingIndicator from '../LoadingIndicator';
import EventForm, { EventFormValues } from './EventForm';

interface EventFormContainerProps {
  eventId?: string;
  teamId?: number;
  onSuccess: (eventId: string) => any | Promise<any>;
  disabled?: boolean;
  initialDate?: Date;
}

const EventFormContainer: React.FC<EventFormContainerProps> = (props) => {
  const {
    event,
    createEvent,
    editEvent,
    createEventError,
    editEventError,
    loading: loadingEvent
  } = useEvent(props.eventId ? { id: props.eventId } : undefined);

  const handleCreateEventSubmit = async (
    formValues: EventFormValues,
    teamId: number
  ) => {
    const result = await createEvent({
      name: formValues.name,
      description: formValues.description,
      start: new Date(formValues.start),
      end: new Date(formValues.end),
      teamId: teamId
    });

    if (result.success) {
      toast('Event created', { type: 'success' });
      props.onSuccess(result.event.id);
    }
  };

  const handleEditEventSubmit = async (
    formValues: EventFormValues,
    eventId: string
  ) => {
    const result = await editEvent({
      name: formValues.name,
      description: formValues.description,
      start: new Date(formValues.start),
      end: new Date(formValues.end),
      id: eventId
    });

    if (result.success) {
      toast('Event edited', { type: 'success' });
      props.onSuccess(result.event.id);
    } else {
      toast(result.error.message, { type: 'error' });
    }
  };

  const handleSubmitAsync = async (values: EventFormValues) => {
    if (props.eventId) {
      await handleEditEventSubmit(values, props.eventId);
    } else if (props.teamId) {
      await handleCreateEventSubmit(values, props.teamId);
    }
  };

  const initialValues =
    props.eventId && event
      ? { ...event }
      : props.initialDate
      ? {
          name: '',
          end: props.initialDate.toISOString(),
          start: props.initialDate.toISOString()
        }
      : undefined;

  return (
    <>
      {props.eventId && !event && !loadingEvent ? (
        <LoadingIndicator />
      ) : (
        <EventForm
          disabled={props.disabled}
          type={props.eventId ? 'edit' : 'create'}
          onSubmit={handleSubmitAsync}
          error={
            props.eventId ? createEventError?.message : editEventError?.message
          }
          initialValues={initialValues}
        />
      )}
    </>
  );
};

export default EventFormContainer;
