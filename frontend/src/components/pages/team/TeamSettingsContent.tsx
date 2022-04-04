import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTeam from '../../../hooks/useTeam';
import TeamSettingsForm, {
  TeamSettingsFormValues
} from '../../forms/TeamSettingsForm';
import Header from '../../Header';

interface TeamSettingsContentProps {
  teamId: number;
}

const TeamSettingsContent: React.FC<TeamSettingsContentProps> = (props) => {
  const { team, editTeam } = useTeam({ id: props.teamId });

  const handleSettingsSubmit = async (values: TeamSettingsFormValues) => {
    const result = await editTeam({
      settings: {
        ...values
      },
      id: props.teamId
    });

    if (result.success) {
      toast('Team settings saved', { type: 'success' });
    }
  };
  if (team === undefined) {
    return <div>Loading...</div>;
  }
  if (team === null || team.settings === null) {
    return <Navigate to={`/teams/${props.teamId}`} />;
  }
  return (
    <div>
      <Header size={3}>Settings</Header>
      <TeamSettingsForm
        onSubmit={handleSettingsSubmit}
        initialValues={{
          discordNotificationsOn: team.settings.discordNotificationsOn,
          discordWebhookUrl: team.settings.discordWebhookUrl
        }}
      />
    </div>
  );
};

export default TeamSettingsContent;
