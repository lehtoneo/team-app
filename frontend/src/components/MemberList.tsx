import React from 'react';
import { UserEventAttendace } from '../graphql/queries/event';
import { TeamTeamMembership } from '../graphql/queries/team';
interface MemberListProps {
  currentUserId?: number;
  users: TeamTeamMembership[] | UserEventAttendace[];
  header?: string;
}
const MemberList: React.FC<MemberListProps> = (props) => {
  const firstClassName = '';
  const middleClassName = 'ml-2';
  const lastClassName = middleClassName;
  return (
    <div>
      {props.header && <div className="font-bold">{props.header}</div>}
      <div className="flex">
        {props.users.map((membership, index) => {
          const isFirst = index === 0;
          const isLast = index === props.users.length - 1;
          const className = isFirst
            ? firstClassName
            : isLast
            ? lastClassName
            : middleClassName;
          return (
            <div className={className} key={membership.id}>
              {membership.user.firstname}
              {!isLast && ', '}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberList;
