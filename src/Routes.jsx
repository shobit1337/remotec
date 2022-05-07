import React from 'react';
import { Route, BrowserRouter as Router, Routes as RoutesContainer } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import App from './App';
import { PrivateRoute } from './components';
import {
  Dashboard,
  HomePage,
  MeetingsPage,
  MyTaskPage,
  OnboardingPage,
  PageNotFound,
  ProjectPage,
  SignIn,
  SignUp,
  TeamsPage,
  UserPage,
} from './pages';

const Routes = () => {
  return (
    <Router>
      {/* Normalizes styles */}
      <CssBaseline />
      <RoutesContainer>
        <Route element={<PrivateRoute />}>
          <Route element={<App />}>
            <Route path='home' element={<HomePage />} />
            <Route path='tasks' element={<MyTaskPage />} />
            <Route path='meetings' element={<MeetingsPage />} />
            <Route path='team/:teamId' element={<TeamsPage />} />
            <Route path='team/:teamId/:projectId' element={<ProjectPage />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='welcome' element={<OnboardingPage />} />
        </Route>

        <Route element={<PrivateRoute authRoute />}>
          <Route path='/' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </RoutesContainer>
    </Router>
  );
};

export default Routes;
