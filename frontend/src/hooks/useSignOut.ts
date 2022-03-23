import { useApolloClient, useMutation } from '@apollo/client';
import tokenManager from '../utils/TokenManager';
import {
  SignOutData,
  SIGN_OUT,
  SignOutInput
} from './../graphql/mutations/signOut';

const useSignOut = () => {
  const client = useApolloClient();
  const [signOutMutation] = useMutation<
    SignOutData,
    { signOutInput: SignOutInput }
  >(SIGN_OUT, {
    fetchPolicy: 'no-cache'
  });
  const signOut = async () => {
    const { refreshToken } = await tokenManager.getTokens();

    if (!refreshToken) {
      throw new Error('should never be here');
    }
    const res = await signOutMutation({
      variables: {
        signOutInput: {
          refreshToken
        }
      }
    });

    if (!res.data?.signOut) {
      return { success: false };
    } else {
      if (res.data.signOut.success) {
        tokenManager.removeTokens();
        await client.resetStore();
        return { success: true };
      }

      return { success: false };
    }
  };
  return {
    signOut
  };
};

export default useSignOut;
