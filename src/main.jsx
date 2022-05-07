import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import { registerSW } from 'virtual:pwa-register';

import App from './App';
import { DarkModeProvider } from './context';
import './index.css';
import { theme } from './styles/theme';

registerSW();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
