import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';

import { ThemeToggler } from '../';

const Navbar = ({ isSidebarClose, setSidebarClose }) => {
  return (
    <>
      <Toolbar
        sx={{
          width: '100%',
          position: 'sticky',
          top: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isSidebarClose && (
            <IconButton
              onClick={() => setSidebarClose(false)}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h5' component='h1' sx={{ marginLeft: '0.5rem' }}>
            Home
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggler />
          <IconButton>
            <PersonIcon fontSize='large' />
          </IconButton>
        </Box>
      </Toolbar>
    </>
  );
};

export default Navbar;
