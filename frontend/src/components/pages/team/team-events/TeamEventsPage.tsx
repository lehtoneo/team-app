import React from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';

import SingleEventPage from './SingleEventPage';
import CreateTeamEventContent from './CreateTeamEventContent';
import useTeam from '../../../../hooks/useTeam';
import Button from '../../../Button';
import Header from '../../../Header';
import LoadingPage from '../../LoadingPage';
import RequireTeamAuthPage from '../RequireTeamAuthPage';
import EventPaginatedList from '../../../eventComps/EventPaginatedList';
import useEventConnection from '../../../../hooks/useEventConnection';
import Calendar from '../../../calendar/Calendar';
import CalendarContainer from '../../../calendar/CalendarContainer';
import FieldInfo from '../../../forms/components/FieldInfo';

interface TeamEventsMainPageContentProps {
  teamId: number;
}

const TeamEventsMainPageContent: React.FC<TeamEventsMainPageContentProps> = (
  props
) => {
  const { teamAuth, team } = useTeam({ id: props.teamId });

  const { events, error: eventFetchError } = useEventConnection({
    paginationInput: { first: 10000 },
    eventFilters: { teamId: props.teamId }
  });

  return (
    <div>
      <Header size={2}>Events</Header>
      {eventFetchError && <p>Error fetching events</p>}
      <FieldInfo>Create events by pressing a date in the calendar</FieldInfo>
      <CalendarContainer
        editable={teamAuth.event.writeRights}
        teamId={props.teamId}
      />
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
