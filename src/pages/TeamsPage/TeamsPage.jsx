import React, { useState } from 'react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

import { RemoveUserModal } from './components';

const paperSx = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  p: 1,
};

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const memberStackSx = {
  height: `calc(100% - 3rem)`,
  overflowY: 'auto',
  p: 1,
};

const TeamsPage = () => {
  const theme = useTheme();
  const [isRemoveUseModelOpen, setIsRemoveUserModelOpen] = useState(false);
  const toggleOpen = () => setIsRemoveUserModelOpen((prev) => !prev);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography variant='h5'>Team Name</Typography>
        <Button title='Copy team code'>
          <Typography sx={{ fontSize: '0.8em' }}> Copy team code </Typography>
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          height: `calc(100vh - 11rem)`,
          marginTop: '1rem',
        }}>
        <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
          <Paper
            variant='outlined'
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' sx={{ marginBottom: '1rem' }} gutterBottom>
              Projects
            </Typography>
            <Grid
              container
              sx={{ height: `calc(100% - 3rem)`, overflowY: 'auto' }}
              columnSpacing={5}
              rowSpacing={2}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <Box
                  sx={{
                    ...flexCenter,
                    borderRadius: 2,
                    border: `2px dashed ${theme.palette.text.primary}`,
                    minWidth: '3rem',
                    height: '3rem',
                  }}>
                  <AddIcon />
                </Box>
                <Typography variant='h6'>Ddsfdfd</Typography>
              </Grid>
              {[1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2].map((_, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    maxHeight: 'max-content',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      bgcolor: 'skyblue',
                      minWidth: '3rem',
                      height: '3rem',
                    }}>
                    <AccountTreeIcon />
                  </Box>
                  <Typography variant='h6'>Ddsfdfd</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
          <Paper
            variant='outlined'
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' gutterBottom>
              Members
            </Typography>
            <Stack gap='1rem' sx={{ ...memberStackSx }}>
              {[1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 2].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flex: '1',
                    gap: '1rem',
                    '&:hover #deleteBtn': {
                      visibility: 'visible',
                    },
                  }}>
                  <Avatar
                    sx={{
                      width: '3rem',
                      height: '3rem',
                      bgcolor: indigo[300],
                      alignSelf: 'center',
                    }}
                    alt='Profile Photo'
                    // src={currentUser?.photoURL}
                  />
                  <Stack
                    flexDirection='row'
                    alignItems='start'
                    justifyContent='space-between'
                    sx={{ width: '100%' }}>
                    <Stack>
                      <Typography variant='h6'>Member Name</Typography>
                      <Typography
                        variant='p'
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        member.name@gmail.com
                      </Typography>
                    </Stack>
                    <IconButton
                      id='deleteBtn'
                      sx={{ visibility: { md: 'hidden', xs: 'visible' } }}
                      onClick={toggleOpen}>
                      <CloseIcon />
                    </IconButton>

                    <RemoveUserModal open={isRemoveUseModelOpen} toggleOpen={toggleOpen} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamsPage;
