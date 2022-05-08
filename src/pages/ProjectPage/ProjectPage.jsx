import React, { useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { Box, Stack, Tab, Tabs } from '@mui/material';

const ProjectPage = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[4];
  const [value, setValue] = useState(path === 'files' ? 1 : path === 'dashboard' ? 2 : 0);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const { projectId, teamId } = useParams();

  return (
    <Stack direction='column' sx={{ width: '100%', position: 'relative' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: '0' }}>
        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
          <Tab label='Tasks' to={`/team/${teamId}/${projectId}`} component={Link} />
          <Tab label='Files' to={`/team/${teamId}/${projectId}/files`} component={Link} />
          <Tab label='Dashboard' to={`/team/${teamId}/${projectId}/dashboard`} component={Link} />
        </Tabs>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default ProjectPage;
