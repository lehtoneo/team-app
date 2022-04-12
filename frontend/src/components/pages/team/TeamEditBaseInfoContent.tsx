import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTeam from '../../../hooks/useTeam';
import TeamBaseInfoForm, {
  TeamBaseInfoFormValues
} from '../../forms/TeamBaseInfoForm';
import LoadingPage from '../LoadingPage';

interface ITeamBaseInfoContentProps {
  teamId: number;
}

const TeamEditBaseInfoContent: React.FC<ITeamBaseInfoContentProps> = (
  props
) => {
  const { team, editTeam } = useTeam({ id: props.teamId });
  const navigate = useNavigate();
  if (!team) {
    return <LoadingPage />;
  }
  const handleSubmit = async (values: TeamBaseInfoFormValues) => {
    const result = await editTeam({
      id: props.teamId,
      baseInfo: {
        ...values
      }
    });
    if (result.success) {
      toast('Team base info edited', { type: 'success' });
      navigate(`/teams/${props.teamId}`);
    } else {
      toast(result.error?.message, { type: 'error' });
    }
  };
  return (
    <div>
      <TeamBaseInfoForm
        type="edit"
        onSubmit={handleSubmit}
        initialValues={{
          name: team.name,
          description: team.description
        }}
      />
    </div>
  );
};

export default TeamEditBaseInfoContent;
