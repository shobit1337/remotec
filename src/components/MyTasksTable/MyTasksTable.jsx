import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';

function createData(task, assignee, dueDate) {
  return { task, assignee, dueDate };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
  createData('Gingerbread', 356, 16.0),
];

const MyTasksTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        overflowX: 'auto',
        margin: '1rem 0',
        height: `calc(100vh - 13rem)`,
      }}>
      <Table stickyHeader sx={{ minWidth: 550 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tasks</TableCell>
            <TableCell align='right'>Assignee</TableCell>
            <TableCell align='right'>Due Date</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTasksTable;
