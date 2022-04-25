import React from 'react';
import { FilterEventsInput } from '../../graphql/queries/eventConnection';
import useEventConnection from '../../hooks/useEventConnection';
import Button from '../Button';
import EventList from './EventList';

interface EventListConnectionProps {
  eventFilters: FilterEventsInput;
}

const EventPaginatedList: React.FC<EventListConnectionProps> = (props) => {
  const { events, loading, pageInfo, fetchNextPage, fetchPreviousPage } =
    useEventConnection({
      paginationInput: { first: 3 },
      eventFilters: props.eventFilters
    });
  return (
    <>
      <div className="flex">
        <div>
          <Button
            size="sm"
            onClick={fetchPreviousPage}
            disabled={!pageInfo?.hasPreviousPage}
          >{`<`}</Button>
        </div>
        <div>
          <Button
            size="sm"
            onClick={fetchNextPage}
            disabled={!pageInfo?.hasNextPage}
          >{`>`}</Button>
        </div>
      </div>
      <EventList events={events} loading={loading} />
      {!loading && events.length === 0 && <div>No events</div>}
    </>
  );
};

export default EventPaginatedList;
