import React from 'react';

import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { flexCenterColumn } from '../../styles/commonObjectStyles';

const Dashboard = () => {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          '& > :not(style)': {
            m: 1,
            width: 200,
            height: 150,
          },
        }}>
        <Paper elevation={3} sx={{ ...flexCenterColumn, gap: '0.5rem' }}>
          Total tasks
          <Typography variant='h2'>15</Typography>
        </Paper>
        <Paper elevation={3} sx={{ ...flexCenterColumn, gap: '0.5rem' }}>
          Completed tasks
          <Typography variant='h2'>15</Typography>
        </Paper>
        <Paper elevation={3} sx={{ ...flexCenterColumn, gap: '0.5rem' }}>
          Incomplete tasks
          <Typography variant='h2'>15</Typography>
        </Paper>
        {/* <Paper elevation={3}></Paper> */}
      </Box>
    </Container>
  );
};

export default Dashboard;
