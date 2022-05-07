import React from 'react';

import { CssBaseline, Typography } from '@mui/material';

import { ThemeToggler } from './components';

function App() {
  return (
    <div className='App'>
      {/* Normalizes styles */}
      <CssBaseline />
      <ThemeToggler />
      <Typography variant='h1' component='h2' sx={{ fontFamily: 'Nova Slim, cursive' }}>
        Remotic
      </Typography>
    </div>
  );
}

export default App;
