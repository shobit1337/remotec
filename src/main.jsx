import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import { registerSW } from 'virtual:pwa-register';

import Routes from './Routes';
import { DarkModeProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { theme } from './styles/theme';

registerSW();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <DarkModeProvider>
          <Routes />
        </DarkModeProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
