import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, ListItem, ListItemText, Stack } from '@mui/material';

import { TasksTable } from '../../components';

const ProjectPage = () => {
  return (
    <Stack direction='column' sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <ListItem button sx={{ textAlign: 'center' }}>
          <ListItemText primary='Tasks' />
        </ListItem>
        <ListItem button sx={{ textAlign: 'center' }}>
          <ListItemText primary='Files' />
        </ListItem>
        <ListItem button sx={{ textAlign: 'center' }}>
          <ListItemText primary='Dashboard' />
        </ListItem>
      </Box>
      <TasksTable />
      <Fab size='medium' color='primary' sx={{ position: 'fixed', bottom: '5rem', right: '4rem' }}>
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default ProjectPage;
