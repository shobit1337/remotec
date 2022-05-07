import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ authRoute = false }) => {
  // TODO: Take isLoggedIn from context after auth setup is done
  const isLoggedIn = () => true;
  const location = useLocation();

  if (authRoute) {
    return isLoggedIn() ? <Navigate replace to={'/home'} /> : <Outlet />;
  }

  return isLoggedIn() ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} />;
};

export default PrivateRoute;
