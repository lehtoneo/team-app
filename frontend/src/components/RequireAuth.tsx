import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserState } from '../redux/reducers/userReducer';

type RequireAuthProps = {
  userState: UserState;
};

const RequireAuthPage: React.FC<RequireAuthProps> = ({
  children,
  userState
}) => {
  if (!userState.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default RequireAuthPage;
