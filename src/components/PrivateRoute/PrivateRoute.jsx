import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../context';

const PrivateRoute = ({ authRoute = false }) => {
  const { isLoggedIn } = useAuth();

  if (authRoute) {
    return isLoggedIn() ? <Navigate replace to={'/welcome'} /> : <Outlet />;
  }
  return isLoggedIn() ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
