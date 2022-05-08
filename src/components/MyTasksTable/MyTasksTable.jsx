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

function createData(task, projects, dueDate) {
  return { task, projects, dueDate };
}

const rows = [
  createData('Frozen yoghurt', 159, 'Project Name'),
  createData('Ice cream sandwich', 237, 'Project Name'),
  createData('Eclair', 262, 'Project Name'),
  createData('Cupcake', 305, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
  createData('Gingerbread', 356, 'Project Name'),
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
            <TableCell align='right'>Due Date</TableCell>
            <TableCell align='right'>Projects</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.task}
              </TableCell>
              <TableCell align='right'>{row.projects}</TableCell>
              <TableCell align='right'>{row.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTasksTable;
