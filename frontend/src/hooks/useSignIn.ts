import { useAppDispatch, useAppSelector } from './redux';
import { useMutation, ApolloClient, useApolloClient } from '@apollo/client';
import { setUserWantsToLogin as setUserWantsToLoginAction } from '../redux/reducers/signInReducer';
import tokenManager from '../utils/TokenManager';
import {
  SignInData,
  SIGN_IN,
  SignInInput
} from './../graphql/mutations/signIn';

const useSignIn = () => {
  const client = useApolloClient();
  const signInState = useAppSelector((state) => state.signIn);
  const dispatch = useAppDispatch();
  const [signInMutation] = useMutation<
    SignInData,
    { signInInput: SignInInput }
  >(SIGN_IN, {
    fetchPolicy: 'no-cache'
  });
  const setUserWantsToLogin = (val: boolean) => {
    dispatch(setUserWantsToLoginAction(val));
  };
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
    signIn,
    ...signInState,
    setUserWantsToLogin
  };
};

export default useSignIn;
