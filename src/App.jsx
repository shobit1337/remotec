import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Bottombar, Navbar, Sidebar } from './components';
import { useAuth } from './context';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: '95vw',
    ...(open && {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser?.workspace?.length <= 0) {
      navigate('/welcome');
    }
  }, [currentUser, navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar DrawerHeader={DrawerHeader} handleDrawerClose={handleDrawerClose} open={open} />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <Bottombar />
    </Box>
  );
}

export default App;
