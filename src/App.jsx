import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Stack , Divider} from '@mui/material';

import { Bottombar, Navbar, Sidebar } from './components';

function App() {
  const [isSidebarClose, setSidebarClose] = useState(false);

  return (
    <Box className='App'>
      <Stack direction='row'>
        <Sidebar isSidebarClose={isSidebarClose} setSidebarClose={setSidebarClose} />
        <Box
          sx={{
            width: '100%',
            height: '100vh',
          }}
        >
          <Navbar isSidebarClose={isSidebarClose} setSidebarClose={setSidebarClose} />
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: '1rem',
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Bottombar />
      </Stack>
    </Box>
  );
}

export default App;
