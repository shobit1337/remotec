import React from 'react';
import { useNavigate } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { WorkspaceContainer } from './components';

const drawerWidth = 240;

const Sidebar = ({ DrawerHeader, handleDrawerClose, open }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 0,
          boxSizing: 'border-box',
          display: { xs: 'none', md: 'block' },
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}>
      <DrawerHeader
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant='h5' sx={{ fontFamily: 'Nova Slim, cursive', marginLeft: '0.5rem' }}>
          Remotec
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <MenuOpenIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem button onClick={() => navigate('/home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>

        <ListItem button onClick={() => navigate('/tasks')}>
          <ListItemIcon>
            <TaskAltIcon />
          </ListItemIcon>
          <ListItemText primary='My Tasks' />
        </ListItem>

        <ListItem button onClick={() => navigate('/meetings')}>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary='Meetings' />
        </ListItem>
      </List>
      <WorkspaceContainer />
    </Drawer>
  );
};

export default Sidebar;
