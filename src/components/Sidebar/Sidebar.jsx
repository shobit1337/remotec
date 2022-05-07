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

const Sidebar = ({ isSidebarClose, setSidebarClose }) => {
  return (
    <Drawer
      sx={{
        width: isSidebarClose ? 0 : drawerWidth,
        '& .MuiDrawer-paper': {
          width: isSidebarClose ? 0 : drawerWidth,
          boxSizing: 'border-box',
          zIndex: 0,
          transition: 'width 0.2s ease',
        },
        display: { xs: 'none', sm: 'block' },
        transition: 'width 0.2s ease',
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' sx={{ fontFamily: 'Nova Slim, cursive' }}>
          Remotec
        </Typography>
        <IconButton onClick={() => setSidebarClose(true)}>
          <MenuOpenIcon />
        </IconButton>
      </Toolbar>

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
        sx={{ padding: '1rem' }}
      >
        <Typography variant='h6'>Team Name</Typography>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
      <List>
        {projectsList.map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <CircleIcon sx={{ color: 'yellow', fontSize: '16px' }} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
