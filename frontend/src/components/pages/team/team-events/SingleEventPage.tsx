import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from 'react-router-dom';
import { UserEventAttendace } from '../../../../graphql/queries/event';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import useEvent from '../../../../hooks/useEvent';
import useTeam from '../../../../hooks/useTeam';
import Button from '../../../Button';

import { SaveAttendanceInput } from '../../../../graphql/mutations/saveAttendance';
import { formatEventDate } from '../../../../utils/Dates';
import InfoItem from '../../../InfoItem';
import MembersAttendances from '../../../MembersAttendances';
import MarkAttendanceForm, {
  AttendanceFormValues
} from '../../../forms/MarkAttendanceForm';
import EditTeamEventContent from './EditTeamEventContent';
import Header from '../../../Header';
import useConfirm from '../../../../hooks/useConfirm';
import LoadingPage from '../../LoadingPage';
import teamAuthUtils from '../../../../utils/teamAuth';

interface ITeamPageContentProps {
  eventId: number;
  teamId: number;
}

interface IUserEventAttendanceComponentProps {
  onSubmit: (values: AttendanceFormValues) => any;
  eventAttendance: UserEventAttendace | null;
}

const UserEventAttendanceComponent: React.FC<
  IUserEventAttendanceComponentProps
> = (props) => {
  const [showMarkAttendance, setShowMarkAttendance] = useState<boolean>(false);
  const initialValues = props.eventAttendance && {
    attendance: props.eventAttendance.attendance,
    reason: props.eventAttendance.reason || ''
  };
  const buttonText = props.eventAttendance ? 'Change' : 'Mark status';
  return (
    <div>
      <div className="my-2">
        <Button onClick={() => setShowMarkAttendance(!showMarkAttendance)}>
          {buttonText}
        </Button>
      </div>
      {showMarkAttendance && (
        <div>
          <MarkAttendanceForm
            onSubmit={props.onSubmit}
            initialValues={initialValues || undefined}
          ></MarkAttendanceForm>
        </div>
      )}
    </div>
  );
};

const EventPageContent = (props: ITeamPageContentProps) => {
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { currentUser } = useCurrentUser();
  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });
  const {
    event,
    loading: loadingEvent,
    saveAttendance,
    deleteEvent
  } = useEvent({ id: props.eventId });

  const handleAttendanceSubmit = async (
    values: Omit<SaveAttendanceInput, 'eventId'>
  ) => {
    const result = await saveAttendance(values);
    if (result.success) {
      toast('Event attendance status updated', { type: 'success' });
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  };

  const handleDeletePress = async () => {
    const confirmed = await confirm(
      'Are you sure you want to delete the event?'
    );
    if (!confirmed) {
      return;
    }

    const deleteResult = await deleteEvent({
      id: props.eventId
    });

    if (deleteResult.success) {
      toast('Event deleted', { type: 'success' });
      navigate(`/teams/${props.teamId}/events`);
    } else {
      toast(deleteResult.error.message, { type: 'error' });
    }
  };

  if (loadingTeam || loadingEvent) {
    return <LoadingPage />;
  }
  if (!event || !currentUser || !team) {
    return <Navigate to="/not-found" />;
  }

  const isPastEvent = new Date(event.end) < new Date();

  const attendanceStatus = event.currentUserEventAttendance;
  const attendanceText =
    attendanceStatus !== undefined
      ? attendanceStatus
        ? 'IN'
        : 'OUT'
      : 'not decided';
  const hasEditRights = teamAuthUtils.isUserTeamRoleAtleast(
    team.currentUserTeamMembership.role,
    'ADMIN'
  );
  const hasDeleteRights = teamAuthUtils.isUserTeamRoleAtleast(
    team.currentUserTeamMembership.role,
    'OWNER'
  );
  return (
    <div>
      <Header size={3}>{event.name}</Header>
      <div className="flex">
        {hasEditRights && (
          <Link to="edit">
            <Button>Edit</Button>
          </Link>
        )}
        {hasDeleteRights && !isPastEvent && (
          <div className="mx-2">
            <Button color="red" onClick={handleDeletePress}>
              Delete{' '}
            </Button>
          </div>
        )}
      </div>
      <InfoItem
        header={isPastEvent ? 'Started' : 'Starts'}
        text={formatEventDate(event.start)}
      />
      <InfoItem
        header={isPastEvent ? 'Ended' : 'Ends'}
        text={formatEventDate(event.end)}
      />
      <InfoItem header="Your attendance">{attendanceText}</InfoItem>
      {event.currentUserEventAttendance !== undefined && !isPastEvent && (
        <UserEventAttendanceComponent
          eventAttendance={event.currentUserEventAttendance}
          onSubmit={handleAttendanceSubmit}
        />
      )}
      <InfoItem header="Member attendances">
        <MembersAttendances
          currentUserId={currentUser.id}
          currentUserAttendance={event.currentUserEventAttendance}
          allTeamMembers={team.memberships}
          attendances={event.userAttendances}
        />
      </InfoItem>
    </div>
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
        element={
          <EventPageContent eventId={Number(eventId)} teamId={Number(teamId)} />
        }
      />
      <Route
        path="/edit"
        element={
          <EditTeamEventContent
            teamId={Number(teamId)}
            eventId={Number(eventId)}
          />
        }
      />
    </Routes>
  );
};

export default SingleEventPage;
