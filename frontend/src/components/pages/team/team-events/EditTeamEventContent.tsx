import { toNamespacedPath } from 'node:path/win32';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useEvent from '../../../../hooks/useEvent';
import useCreateEvent from '../../../../hooks/useEvent/useCreateEvent';
import useTeam from '../../../../hooks/useTeam';
import EventForm, { EventFormValues } from '../../../forms/EventForm';
import PageContainer from '../../components/PageContainer';

interface EditEventPageContentProps {
  teamId: number;
  eventId: number;
}

const EditTeamEventContent = (props: EditEventPageContentProps) => {
  const navigate = useNavigate();
  const { event, editEvent, editEventError } = useEvent({ id: props.eventId });
  const { team } = useTeam({ id: props.teamId });

  const handleEditEventSubmit = async (formValues: EventFormValues) => {
    const result = await editEvent({
      ...formValues,
      start: new Date(formValues.start),
      end: new Date(formValues.end),
      id: props.eventId
    });

    if (result.success) {
      toast('Event edited', { type: 'success' });
      navigate(-1);
    } else {
      toast(result.error.message, { type: 'error' });
    }
  };

  if (event === null) {
    return <Navigate to="/not-found" />;
  }

  if (event === undefined) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <div className="mt-5">
      <EventForm
        initialValues={{
          name: event.name,
          description: event.description,
          start: event.start,
          end: event.end
        }}
        type="edit"
        onSubmit={(val) => handleEditEventSubmit(val)}
        error={editEventError?.message}
      />
    </div>
  );
};

export default EditTeamEventContent;
