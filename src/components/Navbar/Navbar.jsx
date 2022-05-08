import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';

import { ThemeToggler } from '../';
import { useAuth } from '../../context';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({ open, handleDrawerOpen }) => {
  const { signout } = useAuth();
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { xs: '100%', md: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
        color: 'inherit',
      }}
      open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ mr: 2, ...(open && { display: 'none' }) }}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ textTransform: 'capitalize' }} variant='h6' noWrap component='div'>
          {pathname.split('/')[1]}
        </Typography>
      </Toolbar>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThemeToggler />
        <IconButton component={Link} to='/profile' sx={{ marginRight: '1rem' }}>
          <PersonIcon fontSize='medium' />
        </IconButton>
        <IconButton onClick={signout} sx={{ marginRight: '1rem' }}>
          <LogoutIcon fontSize='medium' />
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default Navbar;
