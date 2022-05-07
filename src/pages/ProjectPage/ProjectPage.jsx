import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import { Box, Stack, Tab, Tabs } from '@mui/material';

const ProjectPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const { projectId, teamId } = useParams();

  return (
    <Stack direction='column' sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
          <Tab
            label='Tasks'
            to={`/team/${teamId}/${projectId}`}
            component={Link}
            id='simple-tab-0'
          />
          <Tab
            label='Files'
            to={`/team/${teamId}/${projectId}/files`}
            component={Link}
            id='simple-tab-1'
          />
          <Tab
            label='Dashboard'
            to={`/team/${teamId}/${projectId}/dashboard`}
            component={Link}
            id='simple-tab-2'
          />
        </Tabs>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default ProjectPage;
