import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import useTeam from '../../../hooks/useTeam';
import Button from '../../Button';
import PageContainer from '../components/PageContainer';
import TeamEventsPage from './team-events/TeamEventsPage';
import TeamSettingsContent from './TeamSettingsContent';

interface ITeamPageContentProps {
  teamId: number;
}

const TeamPageContent = (props: ITeamPageContentProps) => {
  const { team } = useTeam({ id: props.teamId });
  const isOwner = team?.currentUserTeamMembership.role === 'OWNER';
  const url = new URL(window.location.href);
  // eslint-disable-next-line no-useless-concat
  const joinLink = url.origin + '/#' + `/teams/join/${team?.joinId}`;

  return (
    <div>
      {isOwner && team.joinId && (
        <div className="flex my-3">
          <Button onClick={() => navigator.clipboard.writeText(joinLink)}>
            Copy join link
          </Button>
        </div>
      )}
      <div className="text-lg font-bold">Members</div>
      {team?.memberships.map((teamMembership) => {
        return (
          <div key={teamMembership.id}>{teamMembership.user.firstname}</div>
        );
      })}
    </div>
  );
};

const TeamPage = () => {
  const { teamId: teamIdString } = useParams();
  const { team } = useTeam({ id: Number(teamIdString) });
  if (!teamIdString || isNaN(Number(teamIdString))) {
    return <Navigate to="/" />;
  }

  const teamId = Number(teamIdString);

  return (
    <PageContainer header={`Team ${team?.name || ''}`}>
      <div className="flex my-2">
        <Link to="">
          <Button>Main</Button>
        </Link>
        <div className="mx-2"> </div>
        <Link to="events">
          <Button>Events</Button>
        </Link>
        <div className="mx-2"> </div>
        {team?.currentUserTeamMembership.role === 'OWNER' && (
          <Link to="settings">
            <Button>Settings</Button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<TeamPageContent teamId={teamId} />} />
        <Route
          path="/settings"
          element={<TeamSettingsContent teamId={teamId} />}
        />
        <Route path="/events/*" element={<TeamEventsPage />} />
      </Routes>
    </PageContainer>
  );
};

export default TeamPage;
