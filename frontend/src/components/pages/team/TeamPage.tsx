import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import useTeam from '../../../hooks/useTeam';
import Button from '../../Button';
import PageContainer from '../components/PageContainer';
import TeamEventsPage from './team-events/TeamEventsPage';
import TeamMainPageContent from './TeamMainPageContent';
import TeamSettingsContent from './TeamSettingsContent';

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
        <Route path="/" element={<TeamMainPageContent teamId={teamId} />} />
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
