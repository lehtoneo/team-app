import { useQuery } from '@apollo/client';
import {
  OneEventTypeInput,
  OneEventTypeQueryData,
  ONE_EVENT_TYPE
} from '../../graphql/queries/oneEventType';

const useEventType = ({ eventTypeId }: { eventTypeId: number }) => {
  const { data, loading } = useQuery<OneEventTypeQueryData, OneEventTypeInput>(
    ONE_EVENT_TYPE,
    {
      variables: { id: eventTypeId }
    }
  );

  return {
    eventType: data,
    loading
  };
};

export default useEventType;
