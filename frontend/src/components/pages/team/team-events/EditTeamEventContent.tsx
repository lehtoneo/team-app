import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useEvent from '../../../../hooks/useEvent';
import EventFormContainer from '../../../forms/EventFormContainer';
import PageContainer from '../../components/PageContainer';

interface EditEventPageContentProps {
  teamId: number;
  eventId: string;
}

const EditTeamEventContent = (props: EditEventPageContentProps) => {
  const navigate = useNavigate();
  const { event } = useEvent({ id: props.eventId });

  if (event === null) {
    return <Navigate to="/not-found" />;
  }

  if (event === undefined) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <div className="mt-5">
      <EventFormContainer
        onSuccess={() => navigate(-1)}
        eventId={props.eventId}
      />
    </div>
  );
};

export default EditTeamEventContent;
