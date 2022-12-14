import { useState } from 'react';
import { toast } from 'react-toastify';
import { EventTypeListInfo } from '../../../../../graphql/queries/eventTypeConnection';
import useEventType from '../../../../../hooks/useEventType';
import useCreateOrUpdateEventType from '../../../../../hooks/useEventType/useCreateOrUpdateEventType';
import useDeleteEventType from '../../../../../hooks/useEventType/useDeleteEventType';
import useEventTypeConnection from '../../../../../hooks/useEventTypeConnection';
import Button from '../../../../Button';
import Dot from '../../../../Dot';
import FieldInfo from '../../../../forms/components/FieldInfo';
import EventTypeForm, {
  EventTypeFormValues
} from '../../../../forms/EventTypeForm';
import LoadingIndicator from '../../../../LoadingIndicator';
import StyledModal from '../../../../modals/StyledModal';

interface IEventTypesProps {
  teamId: number;
}
interface IEventTypeListItemProps {
  onClick?: (eventType: EventTypeListInfo) => any;
  eventType: EventTypeListInfo;
}
const EventTypeListItem: React.FC<IEventTypeListItemProps> = (props) => {
  const { eventType, onClick } = props;
  return (
    <div
      className="grid grid-cols-2 cursor-pointer flex flex-row border-2 p-2 max-w-sm"
      onClick={() => onClick && onClick(eventType)}
    >
      <div className="flex justify-start items-center ml-2">
        {eventType.name}
      </div>
      <div className="flex ml-5 justify-end items-center mr-2">
        <Dot color={eventType.color || 'blue'} height={30} />
      </div>
    </div>
  );
};

const EventTypes: React.FC<IEventTypesProps> = (props) => {
  const [eventTypeFormModalOpen, setEventTypeFormModalOpen] = useState(false);
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<
    number | undefined
  >();
  const selectedEventType = useEventType({ eventTypeId: selectedEventTypeId });
  const { deleteEventType } = useDeleteEventType();
  const { createOrUpdate, loading } = useCreateOrUpdateEventType();
  const handleEventTypeSubmitAsync = async (values: EventTypeFormValues) => {
    const result = await createOrUpdate({ ...values, teamId: props.teamId });
    if (result.success) {
      setEventTypeFormModalOpen(false);
      const successText = values.id
        ? 'Event type updated'
        : 'Event type created';
      toast(successText, { type: 'success' });
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  };
  const handleDeleteClick = async () => {
    if (!selectedEventTypeId) {
      return;
    }
    const deleteResult = await deleteEventType(selectedEventTypeId);
    if (deleteResult.success) {
      toast('Event Type deleted', { type: 'success' });
      setEventTypeFormModalOpen(false);
    } else {
      toast('Error deleting', { type: 'error' });
    }
  };
  const eventTypeConnection = useEventTypeConnection({
    filterEventTypes: { teamId: props.teamId }
  });
  return (
    <>
      <StyledModal
        isOpen={eventTypeFormModalOpen}
        onRequestClose={() => setEventTypeFormModalOpen(false)}
        onAfterClose={() => setSelectedEventTypeId(undefined)}
      >
        {selectedEventType.loading ? (
          <LoadingIndicator />
        ) : (
          <EventTypeForm
            onSubmit={handleEventTypeSubmitAsync}
            initialValues={selectedEventType.eventType || undefined}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </StyledModal>
      <Button
        fullW={false}
        color="green"
        onClick={() => setEventTypeFormModalOpen(true)}
      >
        Create an Event Type
      </Button>
      <FieldInfo>
        Event types can be used to distinguish different events from the
        calendar
      </FieldInfo>
      {eventTypeConnection.error && <p>Error fetching event types</p>}
      {eventTypeConnection.loading && <LoadingIndicator />}
      {eventTypeConnection.eventTypes.map((eventType) => {
        return (
          <EventTypeListItem
            key={eventType.id}
            eventType={eventType}
            onClick={(eventType) => {
              setSelectedEventTypeId(eventType.id);
              setEventTypeFormModalOpen(true);
            }}
          />
        );
      })}
    </>
  );
};

export default EventTypes;
