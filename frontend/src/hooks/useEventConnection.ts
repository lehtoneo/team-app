import {
  EventConnectionInput,
  EventConnectionData,
  EVENT_CONNECTION
} from './../graphql/queries/eventConnection';
import { useQuery } from '@apollo/client';

const useEventConnection = (args?: EventConnectionInput) => {
  const { data, loading } = useQuery<EventConnectionData, EventConnectionInput>(
    EVENT_CONNECTION,
    {
      variables: {
        ...args
      },
      onError: (e) => {
        console.log(e);
      },
      onCompleted: (d) => {
        // console.log({ d });
      }
    }
  );

  return {
    pageInfo: data?.eventConnection?.pageInfo,
    events: data?.eventConnection?.edges.map((edge) => edge.node) || [],
    loading
  };
};

export default useEventConnection;
