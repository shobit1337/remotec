import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

const drawerWidth = 240;
const projectsList = ['Project 1', 'Project 2', 'Project 3'];

const Sidebar = ({ DrawerHeader, handleDrawerClose, open }) => {
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
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <TaskAltIcon />
          </ListItemIcon>
          <ListItemText primary='My Tasks' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary='Meetings' />
        </ListItem>
      </List>

      <Divider />
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ padding: '1rem' }}>
        <Typography variant='h6'>Team Name</Typography>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>

      <List>
        {projectsList.map((text, index) => (
          <ListItem button key={index}>
            <CircleIcon sx={{ color: 'yellow', fontSize: '16px', marginRight: '1rem' }} />
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
