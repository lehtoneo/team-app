import React, { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import useEvent from '../../../../hooks/useEvent';
import useTeam from '../../../../hooks/useTeam';

import EditTeamEventContent from './EditTeamEventContent';
import LoadingPage from '../../LoadingPage';
import EventDetailsContainer from '../../../eventComps/EventDetailsContainer';

interface ITeamPageContentProps {
  eventId: string;
  teamId: number;
}

const EventPageContent = (props: ITeamPageContentProps) => {
  const { currentUser } = useCurrentUser();
  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });
  const { event, loading: loadingEvent } = useEvent({ id: props.eventId });

  if (loadingTeam || loadingEvent) {
    return <LoadingPage />;
  }
  if (!event || !currentUser || !team) {
    return <Navigate to="/not-found" />;
  }

  return (
    <EventDetailsContainer eventId={props.eventId} teamId={props.teamId} />
  );
};

const SingleEventPage = () => {
  const { eventId, teamId } = useParams();
  if (!teamId || !eventId || isNaN(Number(eventId))) {
    return <Navigate to="/not-found" />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={<EventPageContent eventId={eventId} teamId={Number(teamId)} />}
      />
      <Route
        path="/edit"
        element={
          <EditTeamEventContent teamId={Number(teamId)} eventId={eventId} />
        }
      />
    </Routes>
  );
};

export default SingleEventPage;
