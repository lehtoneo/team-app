import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useEvent from '../../../../hooks/useEvent';
import EventForm, { EventFormValues } from '../../../forms/EventForm';
import EventFormContainer from '../../../forms/EventFormContainer';

interface ITeamPageContentProps {
  teamId: number;
}

const CreateTeamEventContent = (props: ITeamPageContentProps) => {
  const navigate = useNavigate();
  const { createEvent, createEventError: error } = useEvent();

  const handleCreateEventSubmit = async (formValues: EventFormValues) => {
    const result = await createEvent({
      ...formValues,
      start: new Date(formValues.start),
      end: new Date(formValues.end),
      teamId: props.teamId
    });

    if (result.success) {
      toast('Event created', { type: 'success' });
      navigate(`/teams/${props.teamId}/events/${result.event.id}`);
    }
  };

  return (
    <div className="mt-5">
      <EventFormContainer
        teamId={props.teamId}
        onSuccess={(eventId) =>
          navigate(`/teams/${props.teamId}/events/${eventId}`)
        }
      />
    </div>
  );
};

export default CreateTeamEventContent;
