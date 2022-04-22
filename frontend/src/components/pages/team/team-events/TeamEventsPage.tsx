import React from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import SingleEventPage from './SingleEventPage';
import CreateTeamEventContent from './CreateTeamEventContent';
import EventList from '../../../eventComps/EventList';
import useTeam from '../../../../hooks/useTeam';
import Button from '../../../Button';
import Header from '../../../Header';
import LoadingPage from '../../LoadingPage';
import RequireTeamAuthPage from '../RequireTeamAuthPage';

interface TeamEventsMainPageContentProps {
  teamId: number;
}

const TeamEventsMainPageContent: React.FC<TeamEventsMainPageContentProps> = (
  props
) => {
  const { team, teamAuth } = useTeam({ id: props.teamId });

  return (
    <div>
      <Header size={3}>Events </Header>
      {teamAuth.event.writeRights && (
        <div className="flex">
          <Link to="create">
            <Button color="green">Create events</Button>
          </Link>
        </div>
      )}
      <EventList events={team?.events || []} />
    </div>
  );
};

const TeamEventsPage = () => {
  const { teamId: teamIdString } = useParams();
  const teamId = Number(teamIdString);
  const { team, teamAuth } = useTeam({ id: teamId });
  if (!teamId || isNaN(teamId)) {
    return <Navigate to="/" />;
  }

  if (!team) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<TeamEventsMainPageContent teamId={teamId} />} />
      <Route
        path="/create"
        element={
          <RequireTeamAuthPage isAuthorized={teamAuth.event.writeRights}>
            <CreateTeamEventContent teamId={teamId} />
          </RequireTeamAuthPage>
        }
      />
      <Route
        path="/:eventId/*"
        element={
          <RequireTeamAuthPage isAuthorized={teamAuth.event.readRights}>
            <SingleEventPage />
          </RequireTeamAuthPage>
        }
      />
    </Routes>
  );
};

export default TeamEventsPage;
