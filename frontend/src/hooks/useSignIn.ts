import { useMutation, ApolloClient, useApolloClient } from '@apollo/client';
import tokenManager from '../utils/TokenManager';
import {
  SignInData,
  SIGN_IN,
  SignInInput
} from './../graphql/mutations/signIn';

const useSignIn = () => {
  const client = useApolloClient();
  const [signInMutation] = useMutation<
    SignInData,
    { signInInput: SignInInput }
  >(SIGN_IN, {
    fetchPolicy: 'no-cache'
  });
  const signIn = async (signInInput: SignInInput) => {
    const res = await signInMutation({
      variables: {
        signInInput
      }
    });

    if (!res.data?.signIn) {
      return null;
    } else {
      tokenManager.setTokens(res.data.signIn);
      await client.resetStore();
      return res.data.signIn;
    }
  };
  return {
    signIn
  };
};

export default useSignIn;
