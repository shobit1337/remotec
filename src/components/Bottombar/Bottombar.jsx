import React, { useState } from 'react';

import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkspaceIcon from '@mui/icons-material/Workspaces';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material/';

const Bottombar = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
      }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
        <BottomNavigationAction label='Home' icon={<HomeIcon />} />
        <BottomNavigationAction label='My Tasks' icon={<TaskAltIcon />} />
        <BottomNavigationAction label='Meetings' icon={<GroupsIcon />} />
        <BottomNavigationAction label='Projects' icon={<WorkspaceIcon />} />
        <BottomNavigationAction label='Profile' icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottombar;
