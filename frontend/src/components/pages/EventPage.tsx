import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserEventAttendace } from '../../graphql/queries/event';
import useCurrentUser from '../../hooks/useCurrentUser';
import useEvent from '../../hooks/useEvent';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';

import PageContainer from './components/PageContainer';
import { SaveAttendanceInput } from '../../graphql/mutations/saveAttendance';
import { formatEventDate } from '../../utils/Dates';
import InfoItem from '../InfoItem';
import MembersAttendances from '../MembersAttendances';
import MarkAttendanceForm, {
  AttendanceFormValues
} from '../forms/MarkAttendanceForm';

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
  const attendanceStatus = props.eventAttendance?.attendance;
  const attendanceText =
    attendanceStatus !== undefined
      ? attendanceStatus
        ? 'IN'
        : 'OUT'
      : 'not decided';

  return (
    <div>
      <div>In/Out: {attendanceText}</div>
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
  const { currentUser } = useCurrentUser();
  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });
  const {
    event,
    loading: loadingEvent,
    saveAttendance
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

  if (loadingTeam || loadingEvent) {
    return <PageContainer>Loading....</PageContainer>;
  }
  if (!event || !currentUser || !team) {
    return <Navigate to="/not-found" />;
  }

  return (
    <PageContainer header={`${event.name || ''}`}>
      <div>
        {team.currentUserTeamMembership.role === 'OWNER' && (
          <Link to="edit">
            <Button>Edit</Button>
          </Link>
        )}
        <InfoItem header="Starts" text={formatEventDate(event.start)} />
        <InfoItem header="Ends" text={formatEventDate(event.end)} />
        <InfoItem header="Your attendance">
          {event.currentUserEventAttendance !== undefined && (
            <UserEventAttendanceComponent
              eventAttendance={event.currentUserEventAttendance}
              onSubmit={handleAttendanceSubmit}
            />
          )}
        </InfoItem>
        <InfoItem header="Member attendances">
          <MembersAttendances
            currentUserId={currentUser.id}
            currentUserAttendance={event.currentUserEventAttendance}
            allTeamMembers={team.memberships}
            attendances={event.userAttendances}
          />
        </InfoItem>
      </div>
    </PageContainer>
  );
};

const EventPage = () => {
  const { eventId, teamId } = useParams();
  if (!teamId || !eventId || isNaN(Number(eventId))) {
    return <Navigate to="/not-found" />;
  }
  return <EventPageContent eventId={Number(eventId)} teamId={Number(teamId)} />;
};

export default EventPage;
