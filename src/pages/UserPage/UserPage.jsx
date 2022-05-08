import React from 'react';

import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';

import { useAuth } from '../../context';
import { flexCenter } from '../../styles/commonObjectStyles';

const UserPage = () => {
  const { currentUser, signout } = useAuth();

  return (
    <div>
      <Container sx={{ minHeight: '100vh' }}>
        <Box
          sx={{
            width: { xs: '100vw', sm: '80vw', lg: '50vw' },
            margin: 'auto',
            ...flexCenter,
          }}>
          <Stack spacing={3} sx={{ alignItems: 'flex-start', padding: '1rem' }}>
            <Avatar
              sx={{ width: '5rem', height: '5rem', bgcolor: indigo[300], alignSelf: 'center' }}
              alt='Remy Sharp'
              src={currentUser?.photoURL}
            />
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline' }}>
              <Typography variant='subtitle1'>Name: {currentUser?.name}</Typography>
            </Stack>
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline' }}>
              <Typography variant='subtitle1'>Email: {currentUser?.email}</Typography>
            </Stack>
            <Stack
              direction='row'
              spacing={5}
              sx={{
                alignItems: 'baseline',
                width: '100%',
                justifyContent: 'space-between',
                paddingTop: '4rem',
              }}>
              <Button variant='outlined' color='error'>
                Exit team
              </Button>
              <Button onClick={signout} variant='contained' color='error'>
                Logout
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default UserPage;
