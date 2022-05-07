import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ authRoute = false }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (authRoute) {
    return isLoggedIn() ? <Navigate replace to={'/home'} /> : <Outlet />;
  }

  return isLoggedIn() ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} />;
};

export default PrivateRoute;
