import { useAppSelector, useAppDispatch } from './redux';

import { useQuery } from '@apollo/client';
import { ME, MeData } from '../graphql/queries/me';
import { setCurrentUserState } from '../redux/reducers/userReducer';

interface IParams {
  updateValues?: boolean;
}

const useCurrentUser = (params?: IParams) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _d } = useQuery<MeData>(ME, {
    onError: (e) => {
      if (params?.updateValues) {
        dispatch(
          setCurrentUserState({
            currentUser: null,
            isLoggedIn: false,
            isLoggingOut: false
          })
        );
      }
    },
    onCompleted: (data) => {
      if (params?.updateValues) {
        if (data.me) {
          dispatch(
            setCurrentUserState({
              currentUser: data.me,
              isLoggedIn: true,
              isLoggingOut: false
            })
          );
        } else {
          dispatch(
            setCurrentUserState({
              currentUser: null,
              isLoggedIn: false,
              isLoggingOut: false
            })
          );
        }
      }
    }
  });
  const currentUserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return {
    ...currentUserState
  };
};

export default useCurrentUser;
