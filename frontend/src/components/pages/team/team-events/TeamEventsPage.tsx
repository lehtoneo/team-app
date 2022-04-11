import React from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import SingleEventPage from './SingleEventPage';
import CreateTeamEventContent from './CreateTeamEventContent';
import EditTeamEventContent from './EditTeamEventContent';
import EventList from '../../../EventList';
import useTeam from '../../../../hooks/useTeam';
import Button from '../../../Button';
import Header from '../../../Header';
import teamAuthUtils from '../../../../utils/teamAuth';

interface TeamEventsMainPageContentProps {
  teamId: number;
}

const TeamEventsMainPageContent: React.FC<TeamEventsMainPageContentProps> = (
  props
) => {
  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });
  const hasEventCreationRights = teamAuthUtils.isUserTeamRoleAtleast(
    team?.currentUserTeamMembership.role,
    'ADMIN'
  );
  const url = new URL(window.location.href);

  return (
    <div>
      <Header size={3}>Events </Header>
      {hasEventCreationRights && (
        <div className="flex">
          <Link to="create">
            <Button>Create events</Button>
          </Link>
        </div>
      )}
      <EventList events={team?.events || []} />
    </div>
  );
};

const TeamEventsPage = () => {
  const { teamId } = useParams();

  if (!teamId || isNaN(Number(teamId))) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<TeamEventsMainPageContent teamId={Number(teamId)} />}
      />
      <Route
        path="/create"
        element={<CreateTeamEventContent teamId={Number(teamId)} />}
      />
      <Route path="/:eventId/*" element={<SingleEventPage />} />
    </Routes>
  );
};

export default TeamEventsPage;
