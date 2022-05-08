import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../context';

const PrivateRoute = ({ authRoute = false }) => {
  const { isLoggedIn } = useAuth();

  console.log('Auth changed: ', isLoggedIn());

  if (authRoute) {
    return isLoggedIn() ? <Navigate replace to={'/welcome'} /> : <Outlet />;
  }
  return isLoggedIn() ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
