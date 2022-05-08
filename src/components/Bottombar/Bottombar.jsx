import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkspaceIcon from '@mui/icons-material/Workspaces';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material/';

import { useWorkspace } from '../../context';

const Bottombar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { workspace } = useWorkspace();
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
        <BottomNavigationAction
          onClick={() => navigate('/home')}
          label='Home'
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/tasks')}
          label='My Tasks'
          icon={<TaskAltIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/meetings')}
          label='Meetings'
          icon={<GroupsIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(`/team/${workspace.uid}`)}
          label='Projects'
          icon={<WorkspaceIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/profile')}
          label='Profile'
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottombar;
