import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { green, indigo, red } from '@mui/material/colors';

import { flexCenterColumn } from '../../styles/commonObjectStyles';
import { getAllWorkspaceMemebers } from '../../utils/members';
import { getAllProjectTasks } from '../../utils/tasks';
import BarGraph from './components/BarGraph';
import PieTodos from './components/PieTodos';

const paperStyles = {
  gap: '0.5rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontWeight: 'bold',
  fontSize: 20,
};

const ProjectDashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const { projectId, teamId } = useParams();
  const [names, setNames] = useState([]);
  let tasksTodos = [];

  const getTotalCountOfTasks = () => {
    tasksTodos = tasks.reduce(
      (acc, curr) =>
        curr.status === 'Done'
          ? { ...acc, done: acc.done + 1 }
          : { ...acc, notDone: acc.notDone + 1 },
      {
        done: 0,
        notDone: 0,
      },
    );
    return tasksTodos;
  };

  useEffect(() => {
    (async () => {
      const tasksArray = await getAllProjectTasks(projectId);
      setTasks(tasksArray);
    })();
  }, [projectId]);

  useEffect(() => {
    (async () => {
      const namesArray = await getAllWorkspaceMemebers(teamId);
      setNames(namesArray);
    })();
  }, [teamId]);

  return (
    <Container
      sx={{
        height: { md: `calc(100vh - 11rem)`, xs: `calc(100vh - 14.5rem)` },
        overflowX: 'auto',
        marginTop: '2rem',
        marginBottom: { xs: '2rem', md: '0' },
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            variant='outlined'
            sx={{ ...flexCenterColumn, ...paperStyles, color: indigo[300] }}>
            Total tasks
            <Typography variant='h2'>{tasks.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant='outlined' sx={{ ...flexCenterColumn, ...paperStyles, color: green[300] }}>
            Completed tasks
            <Typography variant='h2'>{getTotalCountOfTasks().done}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant='outlined' sx={{ ...flexCenterColumn, ...paperStyles, color: red[300] }}>
            Incomplete tasks
            <Typography variant='h2'>{getTotalCountOfTasks().notDone}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            sx={{
              ...flexCenterColumn,
              ...paperStyles,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}>
            Tasks status according to assignee
            {tasksTodos.done !== 0 || tasksTodos.notDone !== 0 ? (
              <BarGraph tasks={tasks} names={names} />
            ) : (
              <Typography variant='h6'>Nothing to show</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            sx={{
              ...flexCenterColumn,
              ...paperStyles,
              width: '100%',
            }}>
            Tasks by completion status
            <Box style={{ margin: '2rem' }}>
              {tasksTodos.done !== 0 || tasksTodos.notDone !== 0 ? (
                <PieTodos tasksTodos={tasksTodos} />
              ) : (
                <Typography variant='h6'>Nothing to show</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectDashboardPage;
