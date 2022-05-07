import React from 'react';

import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';

import { flexCenter } from '../../styles/commonObjectStyles';

const UserPage = () => {
  return (
    <div>
      <Container sx={{ minHeight: '100vh' }}>
        <Box
          sx={{
            width: { xs: '100vw', sm: '80vw', lg: '50vw' },
            height: 300,
            margin: 'auto',
          }}>
          <Stack spacing={3} sx={{ alignItems: 'flex-start', padding: '1rem' }}>
            <Box sx={{ ...flexCenter, width: '70%' }}>
              <Avatar
                sx={{ bgcolor: indigo[300], alignSelf: 'center' }}
                alt='Remy Sharp'
                src='/broken-image.jpg'
              />
            </Box>
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline' }}>
              <Typography variant='subtitle1'>Name: Remotec</Typography>
            </Stack>
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline' }}>
              <Typography variant='subtitle1'>Email: hmusijdvcnjnv@gmail.com</Typography>
            </Stack>
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline' }}>
              <Typography variant='subtitle1'>Password: ********</Typography>
              <Button
                variant='link'
                sx={{ textTransform: 'capitalize', textDecoration: 'underline' }}>
                Change password
              </Button>
            </Stack>
            <Stack direction='row' spacing={5} sx={{ alignItems: 'baseline', paddingTop: '4rem' }}>
              <Button variant='outlined' color='error'>
                Exit team
              </Button>
              <Button variant='contained' color='error'>
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
