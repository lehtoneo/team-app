import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateTeamEventInput } from '../../graphql/mutations/createTeamEvent';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';
import CreateEventForm, {
  ICreateTeamEventFormValues
} from '../forms/CreateEventForm';
import Header from '../Header';
import PageContainer from './components/PageContainer';

interface ITeamPageContentProps {
  teamId: number;
}

const CreateTeamEventContent = (props: ITeamPageContentProps) => {
  const navigate = useNavigate();
  const {
    team,
    loading: loadingTeam,
    createTeamEvent,
    createTeamEventError
  } = useTeam({ id: props.teamId });

  const handleCreateEventSubmit = async (
    formValues: ICreateTeamEventFormValues
  ) => {
    const result = await createTeamEvent({
      ...formValues,
      teamId: props.teamId
    });

    if (result.success) {
      toast('Event created', { type: 'success' });
      navigate(-1);
    }
  };

  return (
    <PageContainer header={`Team ${team?.name || ''}`}>
      <div className="mt-5">
        <CreateEventForm
          onSubmit={(val) => handleCreateEventSubmit(val)}
          error={createTeamEventError?.message}
        />
      </div>
    </PageContainer>
  );
};

const CreateTeamEventPage = () => {
  const { teamId } = useParams();
  if (!teamId || isNaN(Number(teamId))) {
    return <Navigate to="/" />;
  }
  return <CreateTeamEventContent teamId={Number(teamId)} />;
};

export default CreateTeamEventPage;
