import { useEffect, useState } from 'react';
import {
  EventConnectionInput,
  EventConnectionData,
  EVENT_CONNECTION
} from './../graphql/queries/eventConnection';
import { useQuery } from '@apollo/client';

const useEventConnection = (
  initialArgs?: EventConnectionInput,
  skip?: boolean
) => {
  const [args, setArgs] = useState<EventConnectionInput>({ ...initialArgs });
  const { data, loading, error } = useQuery<
    EventConnectionData,
    EventConnectionInput
  >(EVENT_CONNECTION, {
    variables: {
      ...args
    },
    onError: (e) => {
      console.log(e);
    },
    onCompleted: (d) => {
      // console.log({ d });
    }
  });

  const canFetchMore = !loading && data?.eventConnection?.pageInfo;
  const fetchNextPage = async () => {
    const canFetchNextPage =
      canFetchMore && data.eventConnection?.pageInfo.hasNextPage;
    if (!canFetchNextPage) {
      return;
    }
    setArgs({
      ...args,
      paginationInput: {
        ...initialArgs?.paginationInput,
        before: undefined,
        after: data?.eventConnection?.pageInfo.endCursor
      }
    });
  };

  const fetchPreviousPage = async () => {
    const canFetchPreviousPage =
      canFetchMore && data.eventConnection?.pageInfo.hasPreviousPage;
    if (!canFetchPreviousPage) {
      return;
    }

    setArgs({
      ...args,
      paginationInput: {
        ...initialArgs?.paginationInput,
        after: undefined,
        before: data?.eventConnection?.pageInfo.startCursor
      }
    });
  };

  const refetch = async (args: EventConnectionInput) => {
    setArgs({ ...args });
  };

  return {
    pageInfo: data?.eventConnection?.pageInfo,
    events: data?.eventConnection?.edges.map((edge) => edge.node) || [],
    loading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    refetch
  };
};

export default useEventConnection;
