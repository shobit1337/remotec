import * as React from 'react';

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

function createData(task, assignee, dueDate, priority, status) {
  return { task, assignee, dueDate, priority, status };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'Low', 'Off Track'),
  createData('Ice cream sandwich', 237, 9.0, 'High', 'At Risk'),
  createData('Eclair', 262, 16.0, 'Low', 'At Risk'),
  createData('Cupcake', 305, 3.7, 'High', 'Off Track'),
  createData('Gingerbread', 356, 16.0, 'Medium', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
  createData('Gingerbread', 356, 16.0, 'Low', 'On Track'),
];

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
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        overflowX: 'auto',
        margin: '1rem 0',
        height: `calc(100vh - 13rem)`,
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
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.task}
              </TableCell>
              <TableCell align='right'>{row.assignee}</TableCell>
              <TableCell align='right'>{row.dueDate}</TableCell>
              <TableCell align='right'>
                <Chip
                  sx={{ backgroundColor: getPriorityColour(row.priority) }}
                  label={row.priority}
                />
              </TableCell>
              <TableCell align='right'>
                <Chip
                  sx={{ backgroundColor: getStatusColor(row.status) }}
                  label={row.status}></Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
