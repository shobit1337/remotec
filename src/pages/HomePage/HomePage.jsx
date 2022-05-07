import React from 'react';

import { Typography } from '@mui/material';

import { TaskModal } from '../../components';

const HomePage = () => {
  return (
    <div>
      <Typography variant='h1' component='h2' sx={{ fontFamily: 'Nova Slim, cursive' }}>
        HOMEPAGE
      </Typography>
      <TaskModal />
    </div>
  );
};

export default HomePage;
