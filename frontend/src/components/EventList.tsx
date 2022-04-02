import React from 'react';
import { Link } from 'react-router-dom';
import { EventListInfo } from '../graphql/queries/eventConnection';
import { TeamListInfo } from '../graphql/queries/teamConnection';

interface IEventListProps {
  events: EventListInfo[];
}

interface IEventProps {
  event: EventListInfo;
  onClick?: (id: number) => any;
}

const Event = (props: IEventProps) => {
  return (
    <Link to={`/teams/${props.event.team.id}/events/${props.event.id}`}>
      <div className="border-2 my-1">
        <div className="p-2">{props.event.name}</div>
      </div>
    </Link>
  );
};

const EventList = (props: IEventListProps) => {
  return (
    <div>
      {props.events.map((event) => {
        return <Event event={event} key={event.id} />;
      })}
    </div>
  );
};

export default EventList;
