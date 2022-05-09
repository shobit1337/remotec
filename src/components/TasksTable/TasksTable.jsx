import React from 'react';

import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';
import { green, grey, indigo, orange, red } from '@mui/material/colors';

import { useProject } from '../../context';

const getPriorityColour = (priority) => {
  switch (priority) {
    case 'High':
      return red[300];
    case 'Low':
      return green[300];
    case 'Medium':
      return orange[300];
    default:
      return grey[600];
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Doing':
      return orange[300];
    case 'Done':
      return green[300];
    case 'To do':
      return red[300];
    default:
      return grey[600];
  }
};

const getProgressColor = (progress) => {
  switch (progress) {
    case 'Bug':
      return red[300];
    case 'On track':
      return green[300];
    case 'Off track':
      return orange[300];
    case 'Need help':
      return indigo[300];
    default:
      return grey[600];
  }
};

const TasksTable = () => {
  const { projectTasks, setSelectedTask, toggleOpen } = useProject();

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    toggleOpen();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        margin: '1rem 0',
        height: `calc(100vh - 13rem)`,
        overflowX: 'auto',
      }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tasks</TableCell>
            <TableCell align='center'>Assignee</TableCell>
            <TableCell align='center'>Due Date</TableCell>
            <TableCell align='center'>Priority</TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell align='center'>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectTasks?.map((task) => (
            <TableRow
              key={task.uid}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleSelectTask(task)}>
              <TableCell component='th' scope='row'>
                {task.name}
              </TableCell>
              <TableCell align='center'>{task.assigned && task.assigned?.name}</TableCell>
              <TableCell align='center'>
                {task.date && task.date?.toDate().toDateString()}
              </TableCell>
              <TableCell align='center'>
                {task.priority && (
                  <Chip
                    sx={{ backgroundColor: getPriorityColour(task.priority) }}
                    label={task.priority}
                    size='small'
                  />
                )}
              </TableCell>
              <TableCell align='center'>
                {task.status && (
                  <Chip
                    sx={{ backgroundColor: getStatusColor(task.status) }}
                    label={task.status}
                    size='small'></Chip>
                )}
              </TableCell>
              <TableCell align='center'>
                {task.progress && (
                  <Chip
                    sx={{ backgroundColor: getProgressColor(task.progress) }}
                    label={task.progress}
                    size='small'></Chip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
