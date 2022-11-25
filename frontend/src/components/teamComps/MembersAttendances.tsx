import React, { useEffect, useState } from 'react';
import { UserEventAttendace } from '../../graphql/queries/event';

import { TeamTeamMembership } from '../../graphql/queries/team';
import MemberList from './MemberList';

interface MembersAttendancesProps {
  allTeamMembers: TeamTeamMembership[];
  attendances: UserEventAttendace[];
  currentUserId: number;
  currentUserAttendance: UserEventAttendace | null;
}

const MembersAttendances: React.FC<MembersAttendancesProps> = (props) => {
  const [inUsers, setInUsers] = useState<UserEventAttendace[]>([]);
  const [outUsers, setOutUsers] = useState<UserEventAttendace[]>([]);
  const [notDecidedUsers, setNotDecidedUsers] = useState<
    UserEventAttendace[] | TeamTeamMembership[]
  >([]);
  useEffect(() => {
    const inUsers = props.attendances.filter(
      (attendance) => attendance.attendance === true
    );
    setInUsers(inUsers);
    const outUsers = props.attendances.filter(
      (attendance) => attendance.attendance === false
    );
    setOutUsers(outUsers);

    const notDecidedUsers = props.allTeamMembers.filter(
      (member) =>
        !props.attendances.find(
          (attendance) => attendance.user.id === member.user.id
        )
    );

    setNotDecidedUsers(notDecidedUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentUserAttendance]);

  return (
    <>
      <MemberList
        header="In"
        users={inUsers}
        currentUserId={props.currentUserId}
      />
      <MemberList
        header="Out"
        users={outUsers}
        currentUserId={props.currentUserId}
      />
      <MemberList
        header="Not decided"
        users={notDecidedUsers}
        currentUserId={props.currentUserId}
      />
    </>
  );
};

export default MembersAttendances;
