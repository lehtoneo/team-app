import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  EventTypeConnectionData,
  EventTypeConnectionInput,
  EVENT_TYPE_CONNECTION
} from '../graphql/queries/eventTypeConnection';

const useEventTypeConnection = (params: EventTypeConnectionInput) => {
  const [args, setArgs] = useState<EventTypeConnectionInput>({
    ...params
  });

  const { data, loading, error } = useQuery<
    EventTypeConnectionData,
    EventTypeConnectionInput
  >(EVENT_TYPE_CONNECTION, {
    variables: {
      ...args
    },
    onError: (e) => {
      console.log(e);
    }
  });

  const canFetchMore = !loading && data?.eventTypeConnection?.pageInfo;

  const fetchNextPage = async () => {
    const canFetchNextPage =
      canFetchMore && data.eventTypeConnection?.pageInfo.hasNextPage;
    if (!canFetchNextPage) {
      return;
    }
    setArgs({
      ...args,
      paginationInput: {
        ...params?.paginationInput,
        before: undefined,
        after: data?.eventTypeConnection?.pageInfo.endCursor
      }
    });
  };

  return {
    pageInfo: data?.eventTypeConnection?.pageInfo,
    eventTypes: data?.eventTypeConnection?.edges.map((edge) => edge.node) || [],
    loading,
    error,
    fetchNextPage
  };
};

export default useEventTypeConnection;
