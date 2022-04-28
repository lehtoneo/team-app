import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';

import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TeamTeamMembership } from '../../../graphql/queries/team';
import useConfirm from '../../../hooks/useConfirm';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useTeam from '../../../hooks/useTeam';
import useEditTeamMembership from '../../../hooks/useTeam/useEditTeamMembership';
import Button from '../../Button';
import FieldInfo from '../../forms/components/FieldInfo';
import TeamMembershipForm, {
  TeamMemberFormValues
} from '../../forms/TeamMembershipForm';
import TeamSettingsForm, {
  TeamSettingsFormValues
} from '../../forms/TeamSettingsForm';
import Header from '../../Header';
import LoadingPage from '../LoadingPage';

interface TeamSettingsContentProps {
  teamId: number;
}

interface MemberShipSettingsProps {
  membership: TeamTeamMembership;
  teamId: number;
}

const MembershipSettings: React.FC<MemberShipSettingsProps> = (props) => {
  const { membership } = props;
  const { currentUser } = useCurrentUser();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { editTeamMembership } = useEditTeamMembership();

  const handleNameClick = () => {
    if (membership.role === 'OWNER') {
      return;
    }
    setIsExpanded((curr) => !curr);
  };
  const handleSubmit = async (values: TeamMemberFormValues) => {
    const result = await editTeamMembership({
      teamId: props.teamId,
      userId: membership.user.id,
      ...values
    });
    if (result.success) {
      toast('Member updated', { type: 'success' });
    } else {
      toast(`${result.error.message}`, { type: 'error' });
    }
  };
  return (
    <div key={membership.id} className="flex-row bg-gray-100 my-2 p-2 rounded">
      <Button size="sm" fullW={false} onClick={handleNameClick}>
        <div className="flex">
          {membership.user.firstname}{' '}
          {membership.user.id === currentUser?.id && '(You)'}
          <div className="flex items-center ml-2 mt-0">
            {membership.role === 'OWNER' && (
              <FaCrown className="text-yellow-400" />
            )}
          </div>
        </div>
      </Button>
      {isExpanded && (
        <div className="my-2">
          <TeamMembershipForm
            initialValues={{ role: membership.role }}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

const TeamSettingsContent: React.FC<TeamSettingsContentProps> = (props) => {
  const { team, editTeam, deleteTeam } = useTeam({ id: props.teamId });
  const { confirm } = useConfirm();
  const navigate = useNavigate();

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
  const handleTeamDelete = async () => {
    const confirmed = await confirm(
      'Are you sure you want to delete the team? This cannot be undone!'
    );
    if (!confirmed) {
      return;
    }

    const res = await deleteTeam(props.teamId);
    if (res.success) {
      toast(`Team ${team?.name || ''} deleted`, { type: 'success' });
      navigate('/teams/own');
    } else {
      toast(res.error?.message, { type: 'error' });
    }
  };
  if (team === undefined) {
    return <LoadingPage />;
  }
  if (team === null || team.settings === null) {
    return <Navigate to={`/teams/${props.teamId}`} />;
  }
  return (
    <div>
      <Header size={3}>Settings</Header>
      <Header size={2} center={false}>
        Basic settings
      </Header>
      <TeamSettingsForm
        onSubmit={handleSettingsSubmit}
        initialValues={{
          discordNotificationsOn: team.settings.discordNotificationsOn,
          discordWebhookUrl: team.settings.discordWebhookUrl,
          trollMessages: team.settings.trollMessages
        }}
      />
      <div className="my-2">
        <Header size={2} center={false}>
          Member settings
        </Header>
        <div className="w-1/2 p-1">
          {team.memberships.map((membership) => {
            return (
              <MembershipSettings
                membership={membership}
                key={membership.id}
                teamId={team.id}
              />
            );
          })}
        </div>
      </div>

      <div className="my-2">
        <Header size={2} center={false}>
          Delete team
        </Header>
        <div className="flex-row">
          <FieldInfo>
            This cannot be undone! All events, attendances and settings of the
            team will be deleted.
          </FieldInfo>
          <Button color="red" fullW={false} onClick={handleTeamDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamSettingsContent;
