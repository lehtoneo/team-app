import React from 'react';

import { useQuery } from '@apollo/client';
import { ME, MeData } from '../graphql/queries/me';

const useCurrentUser = () => {
  const { data, networkStatus } = useQuery<MeData>(ME, { fetchPolicy: 'cache-and-network' });

  const isLoggedIn = networkStatus === 1
    ? undefined
    : !!data?.me
  return {
    currentUser: data?.me || undefined,
    isLoggedIn
  };
};

export default useCurrentUser;
