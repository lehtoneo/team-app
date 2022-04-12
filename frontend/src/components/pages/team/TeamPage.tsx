import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import useTeam from '../../../hooks/useTeam';
import teamAuthUtils from '../../../utils/teamAuth';
import Button from '../../Button';
import Header from '../../Header';
import PageContainer from '../components/PageContainer';
import LoadingPage from '../LoadingPage';
import RequireTeamAuthPage from './RequireTeamAuthPage';
import TeamEventsPage from './team-events/TeamEventsPage';
import TeamEditBaseInfoContent from './TeamEditBaseInfoContent';
import TeamMainPageContent from './TeamMainPageContent';
import TeamSettingsContent from './TeamSettingsContent';
import TeamStatisticsPageContent from './TeamStatisticsPageContent';

const TeamPage = () => {
  const { teamId: teamIdString } = useParams();
  const { team } = useTeam({ id: Number(teamIdString) });
  const teamId = Number(teamIdString);
  if (!teamIdString || isNaN(teamId) || team === null) {
    return <Navigate to="/not-found" />;
  }

  if (team === undefined) {
    return <LoadingPage />;
  }

  const hasSettingsRights = teamAuthUtils.isUserTeamRoleAtleast(
    team.currentUserTeamMembership.role,
    'OWNER'
  );

  return (
    <PageContainer>
      <div className="flex my-2">
        <Link to="">
          <Button>Main</Button>
        </Link>
        <div className="mx-2"> </div>
        <Link to="statistics">
          <Button>Statistics</Button>
        </Link>
        <div className="mx-2"> </div>
        <Link to="events">
          <Button>Events</Button>
        </Link>
        <div className="mx-2"> </div>
        {hasSettingsRights && (
          <Link to="settings">
            <Button>Settings</Button>
          </Link>
        )}
      </div>
      <div className="mb-5">
        <Header>{`Team ${team?.name || ''}`}</Header>
      </div>
      <Routes>
        <Route path="/" element={<TeamMainPageContent teamId={teamId} />} />
        <Route
          path="/edit"
          element={
            <RequireTeamAuthPage
              currentUserTeamMembership={team.currentUserTeamMembership}
              minTeamRole={'OWNER'}
            >
              <TeamEditBaseInfoContent teamId={teamId} />
            </RequireTeamAuthPage>
          }
        />
        <Route
          path="/statistics"
          element={<TeamStatisticsPageContent teamId={teamId} />}
        />
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
