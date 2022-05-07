import React from 'react';

import {
  CssBaseline,
  Typography,
} from '@mui/material';


function App() {


  return (
    <div className='App'>
      {/* Normalizes styles */}
      <CssBaseline />
        <Typography variant='h1' component='h2' sx={{ fontFamily: 'Nova Slim, cursive' }}>
          Remotic
        </Typography>

    </div>
  );
}

export default App;
