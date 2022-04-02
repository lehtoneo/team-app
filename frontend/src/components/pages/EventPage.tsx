import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserEventAttendace } from '../../graphql/queries/event';
import useCurrentUser from '../../hooks/useCurrentUser';
import useEvent from '../../hooks/useEvent';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';
import Switch from 'react-switch';

import PageContainer from './components/PageContainer';
import Field, { fieldClassName } from '../forms/components/Field';
import Label from '../forms/components/Label';
import { SaveAttendanceInput } from '../../graphql/mutations/saveAttendance';
import { formatEventDate } from '../../utils/Dates';

interface ITeamPageContentProps {
  eventId: number;
  teamId: number;
}

interface IUserEventAttendanceComponentProps {
  onSubmit: (values: AttendanceFormValues) => any;
  eventAttendance: UserEventAttendace | null;
}

interface AttendanceFormValues {
  attendance: boolean;
  reason: string;
}

interface IMarkAttendanceProps {
  attendanceValue: boolean;
  onChange: (val: boolean) => any;
  onSubmit: (values: AttendanceFormValues) => any;
}

const MarkAttendance: React.FC<IMarkAttendanceProps> = (props) => {
  const [reason, setReason] = useState<string>('');
  const inOutText = props.attendanceValue ? 'IN' : 'OUT';
  return (
    <div className="my-2">
      <div>{inOutText}</div>
      <Switch
        onChange={(value) => props.onChange(value)}
        checked={props.attendanceValue}
      />
      {!props.attendanceValue && (
        <div>
          <Label htmlFor="reason">Reason</Label>
          <input className={fieldClassName} name="reason" />
        </div>
      )}
      <div className="my-2">
        <Button
          onClick={() =>
            props.onSubmit({ reason, attendance: props.attendanceValue })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const UserEventAttendanceComponent: React.FC<
  IUserEventAttendanceComponentProps
> = (props) => {
  const [showMarkAttendance, setShowMarkAttendance] = useState<boolean>(false);
  const [attendanceValue, setAttendanceValue] = useState<boolean>(
    props.eventAttendance?.attendance !== undefined
      ? props.eventAttendance.attendance
      : true
  );
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
          <MarkAttendance
            onSubmit={props.onSubmit}
            onChange={(val) => setAttendanceValue(val)}
            attendanceValue={attendanceValue}
          />
        </div>
      )}
    </div>
  );
};

const EventPageContent = (props: ITeamPageContentProps) => {
  const { currentUser } = useCurrentUser();
  const [userEventAttendance, setUserEventAttendance] = useState<
    UserEventAttendace | undefined | null
  >(undefined);
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

  useEffect(() => {
    if (team && event && currentUser) {
      const eventAttendanceFromArray = event.userAttendances.find(
        (attendance) => attendance.userId === currentUser.id
      );
      if (eventAttendanceFromArray) {
        setUserEventAttendance(eventAttendanceFromArray);
      } else {
        setUserEventAttendance(null);
      }
    }
  }, [event, team, currentUser]);

  if (loadingTeam || loadingEvent) {
    return <PageContainer>Loading....</PageContainer>;
  }
  if (!event || !currentUser || !team) {
    return <Navigate to="/not-found" />;
  }

  return (
    <PageContainer header={`${event.name || ''}`}>
      <div>
        <div>Starts</div>
        <div>{formatEventDate(event.start)}</div>
        <div>Ends</div>
        <div>{formatEventDate(event.end)}</div>
        <div>Your attendance</div>
        {event.currentUserEventAttendance !== undefined && (
          <UserEventAttendanceComponent
            eventAttendance={event.currentUserEventAttendance}
            onSubmit={handleAttendanceSubmit}
          />
        )}
      </div>
    </PageContainer>
  );
};

const EventPage = () => {
  const { eventId, teamId } = useParams();
  if (!teamId || !eventId || isNaN(Number(eventId))) {
    return <Navigate to="/" />;
  }
  return <EventPageContent eventId={Number(eventId)} teamId={Number(teamId)} />;
};

export default EventPage;
