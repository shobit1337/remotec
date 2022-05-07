import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box, Divider, Stack } from '@mui/material';

import { Bottombar, Navbar, Sidebar } from './components';
import { useAuth } from './context';

function App() {
  const [isSidebarClose, setSidebarClose] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.workspace?.length <= 0) {
      navigate('/welcome');
    }
  }, [currentUser, navigate]);

  return (
    <Box className='App'>
      <Stack direction='row'>
        <Sidebar isSidebarClose={isSidebarClose} setSidebarClose={setSidebarClose} />
        <Box
          sx={{
            width: '100%',
            height: '100vh',
          }}>
          <Navbar isSidebarClose={isSidebarClose} setSidebarClose={setSidebarClose} />
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: '1rem',
            }}>
            <Outlet />
          </Box>
        </Box>
        <Bottombar />
      </Stack>
    </Box>
  );
}

export default App;
