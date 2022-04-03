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
import InfoItem from '../InfoItem';
import { TeamTeamMembership } from '../../graphql/queries/team';

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

interface MemberListProps {
  members: TeamTeamMembership[];
  header: string;
}
const MemberList: React.FC<MemberListProps> = (props) => {
  const firstClassName = '';
  const middleClassName = 'ml-2';
  const lastClassName = middleClassName;
  return (
    <div>
      <div className="font-bold">{props.header}</div>
      <div className="flex">
        {props.members.map((membership, index) => {
          const isFirst = index === 0;
          const isLast = index === props.members.length - 1;
          const className = isFirst
            ? firstClassName
            : isLast
            ? lastClassName
            : middleClassName;
          return (
            <div className={className}>
              {membership.user.firstname}
              {!isLast && ', '}
            </div>
          );
        })}
      </div>
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
  const userMap: { [key in number]: TeamTeamMembership } = {};
  const inUsers = team.memberships.filter((membership) => {
    const memberAttendance = event.userAttendances.find(
      (attendance) => attendance.userId === membership.user.id
    );

    return memberAttendance?.attendance === true;
  });
  const outUsers = team.memberships.filter((membership) => {
    const memberAttendance = event.userAttendances.find(
      (attendance) => attendance.userId === membership.user.id
    );

    return memberAttendance?.attendance === false;
  });

  const notDecidedUsers = team.memberships.filter((membership) => {
    const memberInAttendanceList = event.userAttendances.find(
      (attendance) => attendance.userId === membership.user.id
    );

    return !memberInAttendanceList;
  });

  return (
    <PageContainer header={`${event.name || ''}`}>
      <div>
        <InfoItem header="Starts" text={formatEventDate(event.start)} />
        <InfoItem header="Ends" text={formatEventDate(event.end)} />
        <InfoItem header="You attendance">
          {event.currentUserEventAttendance !== undefined && (
            <UserEventAttendanceComponent
              eventAttendance={event.currentUserEventAttendance}
              onSubmit={handleAttendanceSubmit}
            />
          )}
        </InfoItem>
        <InfoItem header="Member attendances">
          <MemberList header="In" members={inUsers} />
          <MemberList header="Out" members={outUsers} />
          <MemberList header="Not decided" members={notDecidedUsers} />
        </InfoItem>
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
