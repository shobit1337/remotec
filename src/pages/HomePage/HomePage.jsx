import React from 'react';

import { Typography } from '@mui/material';

import { ProjectModal, TaskModal } from '../../components';

const HomePage = () => {
  return (
    <div>
      <Typography variant='h1' component='h2' sx={{ fontFamily: 'Nova Slim, cursive' }}>
        HOMEPAGE
      </Typography>
      <TaskModal />
      <ProjectModal />
    </div>
  );
};

export default HomePage;
