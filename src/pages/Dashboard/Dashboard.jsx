import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { Container, Grid, Paper, Typography } from '@mui/material';
import { lightBlue, orange } from '@mui/material/colors';

import { flexCenterColumn } from '../../styles/commonObjectStyles';
import BarGraph from './components/BarGraph';

const paperStyles = {
  gap: '0.5rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
};

const Dashboard = () => {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ ...flexCenterColumn, ...paperStyles }}>
            Total tasks
            <Typography variant='h2'>15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ ...flexCenterColumn, ...paperStyles }}>
            Completed tasks
            <Typography variant='h2'>15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ ...flexCenterColumn, ...paperStyles }}>
            Incomplete tasks
            <Typography variant='h2'>15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              ...flexCenterColumn,
              ...paperStyles,
              width: '100%',
              height: 400,
              overflow: 'auto',
            }}>
            Tasks by completion status
            <BarGraph />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              ...flexCenterColumn,
              ...paperStyles,
              width: '100%',
              height: 400,
            }}>
            Tasks by completion status
            <PieChart
              data={[
                { title: 'To do items', value: 10, color: orange[300] },
                { title: 'Completed items', value: 20, color: lightBlue[300] },
              ]}
              lineWidth='30'
              style={{ padding: '2rem' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
