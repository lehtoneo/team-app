import { useState } from 'react';
import { useNewsConnectionQuery } from '../../graphql/queries/newsConnection';

const useTeamNewsConnection = (id: number) => {
  const [fetchingMore, setFetchingMore] = useState(false);
  const initialParams = {
    teamId: id,
    first: 10
  };
  const query = useNewsConnectionQuery({
    variables: {
      ...initialParams
    }
  });

  const fetchMoreIfCanAsync = async () => {
    const connection = query.data?.newsConnection;
    if (!connection || !connection.pageInfo.hasNextPage || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await query.fetchMore({
      variables: {
        ...initialParams,
        after: connection.pageInfo.endCursor
      }
    });
    setFetchingMore(false);
  };

  return {
    data: query.data,
    fetchingMore,
    fetchMoreIfCanAsync
  };
};

export default useTeamNewsConnection;
