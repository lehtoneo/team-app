import React from 'react';
import { Navigate } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';

const RequireAuthPage = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useCurrentUser();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default RequireAuthPage;
