import React from 'react';
import { Navigate } from 'react-router-dom';

type RequireTeamAuthProps = {
  isAuthorized: boolean;
};

const RequireTeamAuthPage: React.FC<RequireTeamAuthProps> = (props) => {
  if (!props.isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};

export default RequireTeamAuthPage;
