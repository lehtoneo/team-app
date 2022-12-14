import React from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';

import SingleEventPage from './SingleEventPage';
import useTeam from '../../../../hooks/useTeam';
import Button from '../../../Button';
import Header from '../../../Header';
import LoadingPage from '../../LoadingPage';
import RequireTeamAuthPage from '../RequireTeamAuthPage';
import useEventConnection from '../../../../hooks/useEventConnection';
import CalendarContainer from '../../../calendar/CalendarContainer';
import FieldInfo from '../../../forms/components/FieldInfo';
import useEventTypeConnection from '../../../../hooks/useEventTypeConnection';
import LoadingIndicator from '../../../LoadingIndicator';
import EventTypes from './components/EventTypes';

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

  const eventTypeConnection = useEventTypeConnection({
    filterEventTypes: { teamId: props.teamId }
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
      <Header size={2}>Event types</Header>
      <EventTypes teamId={props.teamId} />
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
