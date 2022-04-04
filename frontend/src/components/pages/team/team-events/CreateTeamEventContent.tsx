import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCreateEvent from '../../../../hooks/useEvent/useCreateEvent';
import useTeam from '../../../../hooks/useTeam';
import EventForm, { EventFormValues } from '../../../forms/EventForm';
import PageContainer from '../../components/PageContainer';

interface ITeamPageContentProps {
  teamId: number;
}

const CreateTeamEventContent = (props: ITeamPageContentProps) => {
  const navigate = useNavigate();
  const { team } = useTeam({ id: props.teamId });
  const { createEvent, error } = useCreateEvent();

  const handleCreateEventSubmit = async (formValues: EventFormValues) => {
    const result = await createEvent({
      ...formValues,
      start: new Date(formValues.start),
      end: new Date(formValues.end),
      teamId: props.teamId
    });

    if (result.success) {
      toast('Event created', { type: 'success' });
      navigate(-1);
    }
  };

  return (
    <div className="mt-5">
      <EventForm
        type="create"
        onSubmit={(val) => handleCreateEventSubmit(val)}
        error={error?.message}
      />
    </div>
  );
};

export default CreateTeamEventContent;