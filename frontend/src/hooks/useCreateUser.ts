import { useMutation, useApolloClient } from '@apollo/client';
import tokenManager from '../utils/TokenManager';

import {
  CreateUserData,
  CREATE_USER,
  CreateUserInput
} from './../graphql/mutations/createUser';

const useCreateUser = () => {
  const client = useApolloClient();
  const [createUserMutation] = useMutation<
    CreateUserData,
    { createUserInput: CreateUserInput }
  >(CREATE_USER, {
    fetchPolicy: 'no-cache'
  });
  const createUser = async (createUserInput: CreateUserInput) => {
    const res = await createUserMutation({
      variables: {
        createUserInput
      }
    });

    if (!res.data?.createUser) {
      return null;
    } else {
      tokenManager.setTokens(res.data.createUser);
      client.resetStore();
      return res.data.createUser;
    }
  };
  return {
    createUser
  };
};

export default useCreateUser;
