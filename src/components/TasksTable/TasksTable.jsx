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
import { green, grey, orange, red } from '@mui/material/colors';

import { useProject } from '../../context';

function createData(task, assignee, dueDate, priority, status) {
  return { task, assignee, dueDate, priority, status };
}

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
    case 'At Risk':
      return orange[300];
    case 'On Track':
      return green[300];
    case 'Off Track':
      return red[300];
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
            <TableCell align='right'>Assignee</TableCell>
            <TableCell align='right'>Due Date</TableCell>
            <TableCell align='right'>Priority</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectTasks?.map((task) => (
            <TableRow
              key={task.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => handleSelectTask(task)}>
              <TableCell component='th' scope='row'>
                {task.name}
              </TableCell>
              <TableCell align='right'>{task.assigned && task.assigned?.name}</TableCell>
              <TableCell align='right'>{task.date && task.date?.toDate().toDateString()}</TableCell>
              <TableCell align='right'>
                {task.priority && (
                  <Chip
                    sx={{ backgroundColor: getPriorityColour(task.priority) }}
                    label={task.priority}
                  />
                )}
              </TableCell>
              <TableCell align='right'>
                {task.status && (
                  <Chip
                    sx={{ backgroundColor: getStatusColor(task.status) }}
                    label={task.status}></Chip>
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
