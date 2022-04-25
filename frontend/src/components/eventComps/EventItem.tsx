import React from 'react';
import { Link } from 'react-router-dom';
import { EventListInfo } from '../../graphql/queries/eventConnection';
import { formatEventDate } from '../../utils/Dates';

interface EventProps {
  event: EventListInfo;
  onClick?: (id: number) => any;
}

type EventItemContainerBorderColor = 'red' | 'green' | 'default';

interface EventItemContainerProps {
  color: 'red' | 'green' | 'default';
}

const eventItemContainerBorderStyle: {
  [key in EventItemContainerBorderColor]: string;
} = {
  default: ``,
  red: `border-red-700`,
  green: `border-green-700`
};

const EventItemContainer: React.FC<EventItemContainerProps> = (props) => {
  const className = `border-2 my-1 ${
    eventItemContainerBorderStyle[props.color]
  }`;

  return (
    <div className={className}>
      <div className="p-2 flex-row">{props.children}</div>
    </div>
  );
};

const EventItem = (props: EventProps) => {
  const attendanceStatus = props.event.currentUserEventAttendance?.attendance;
  const attendanceText =
    attendanceStatus !== undefined
      ? attendanceStatus
        ? 'IN'
        : 'OUT'
      : 'not decided';
  const getContainerBorderColor = (): EventItemContainerBorderColor => {
    if (attendanceStatus !== undefined) {
      const isIn = attendanceStatus === true;
      return isIn ? 'green' : 'red';
    } else {
      return 'default';
    }
  };

  return (
    <Link to={`/teams/${props.event.team.id}/events/${props.event.id}`}>
      <EventItemContainer color={getContainerBorderColor()}>
        <div className="flex-1 text-center text-xl font-bold">
          {props.event.team.name}
        </div>
        <div className="flex-1 text-lg font-bold">{props.event.name}</div>
        <div>{formatEventDate(props.event.start)}</div>
        <div>In/Out: {attendanceText}</div>
      </EventItemContainer>
    </Link>
  );
};

export default EventItem;
