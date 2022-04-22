import React from 'react';
import { EventListInfo } from '../../graphql/queries/eventConnection';
import LoadingIndicator from '../LoadingIndicator';
import EventItem from './EventItem';

interface EventListProps {
  events: EventListInfo[];
  loading?: boolean;
}
const EventList = (props: EventListProps) => {
  return (
    <div>
      {!props.loading &&
        props.events.map((event) => {
          return <EventItem event={event} key={event.id} />;
        })}
      {props.loading && <LoadingIndicator />}
    </div>
  );
};

export default EventList;
