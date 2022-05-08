import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import { registerSW } from 'virtual:pwa-register';

import Routes from './Routes';
import { AuthProvider, DarkModeProvider, WorkspaceProvider } from './context';
import './index.css';
import { theme } from './styles/theme';

registerSW();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DarkModeProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <Routes />
          </WorkspaceProvider>
        </AuthProvider>
      </DarkModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
