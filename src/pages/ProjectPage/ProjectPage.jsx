import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, ListItem, ListItemText, Stack } from '@mui/material';

const ProjectPage = () => {
  return (
    <Stack direction='column' sx={{ width: '100%' }}>
      {/* Project Tabs */}
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
      <Outlet />
    </Stack>
  );
};

export default ProjectPage;
