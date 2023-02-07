import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import useTeam from '../../../hooks/useTeam';
import useTeamNewsConnection from '../../../hooks/useTeamNews/useTeamNewsConnection';
import Button from '../../Button';
import Header from '../../Header';
import PageContainer from '../components/PageContainer';
import LoadingPage from '../LoadingPage';
import NotFoundPage from '../NotFoundPage';
import RequireTeamAuthPage from './RequireTeamAuthPage';
import TeamEventsPage from './team-events/TeamEventsPage';
import CreateOrUpdateTeamNewsPage from './team-news/CreateOrUpdateTeamNewsPage';
import TeamEditBaseInfoContent from './TeamEditBaseInfoContent';
import TeamMainPageContent from './TeamMainPageContent';
import TeamSettingsContent from './TeamSettingsContent';
import TeamStatisticsPageContent from './TeamStatisticsPageContent';

const TeamPage = () => {
  const { teamId: teamIdString } = useParams();
  const { team, teamAuth } = useTeam({ id: Number(teamIdString) });
  const teamId = Number(teamIdString);
  if (!teamIdString || isNaN(teamId) || team === null) {
    return <Navigate to="/not-found" />;
  }

  if (team === undefined) {
    return <LoadingPage />;
  }

  return (
    <PageContainer>
      <div className="mb-5">
        <Header>{`Team ${team?.name || ''}`}</Header>
      </div>
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
        {teamAuth.settings.readRights && (
          <Link to="settings">
            <Button>Settings</Button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<TeamMainPageContent teamId={teamId} />} />
        <Route
          path="/edit"
          element={
            <RequireTeamAuthPage isAuthorized={teamAuth.event.writeRights}>
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
          element={
            <RequireTeamAuthPage isAuthorized={teamAuth.settings.readRights}>
              <TeamSettingsContent teamId={teamId} />
            </RequireTeamAuthPage>
          }
        />
        <Route
          path="/events/*"
          element={
            <RequireTeamAuthPage isAuthorized={teamAuth.event.readRights}>
              <TeamEventsPage />
            </RequireTeamAuthPage>
          }
        />
        <Route
          path="/news/:newsId/edit"
          element={
            <RequireTeamAuthPage isAuthorized={teamAuth.news.writeRights}>
              <CreateOrUpdateTeamNewsPage />
            </RequireTeamAuthPage>
          }
        />
        <Route
          path="/news/create"
          element={
            <RequireTeamAuthPage isAuthorized={teamAuth.news.writeRights}>
              <CreateOrUpdateTeamNewsPage />
            </RequireTeamAuthPage>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageContainer>
  );
};

export default TeamPage;
