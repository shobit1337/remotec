import React from 'react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

const paperSx = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  p: 3,
};

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const memberStackSx = {
  height: `calc(100% - 3rem)`,
  overflowY: 'auto',
};

const TeamsPage = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography variant='h5'>Team Name</Typography>
        <IconButton title='Copy team code'>
          <ContentCopyIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3} sx={{ height: `calc(100vh - 11rem)` }}>
        <Grid item xs={12} sm={6}>
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
              sx={{ height: '50vh', overflowY: 'auto' }}
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
                    width: '3rem',
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
                      width: '3rem',
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    '&:hover #deleteBtn': {
                      visibility: 'visible',
                    },
                  }}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'skyblue',
                      minWidth: '3rem',
                      height: '3rem',
                    }}>
                    <AccountTreeIcon />
                  </Box>
                  <Stack>
                    <Typography variant='h6'>Member Name</Typography>
                    <Typography variant='p'> member.name@gmail.com </Typography>
                  </Stack>
                  <IconButton id='deleteBtn' sx={{ visibility: { md: 'hidden', xs: 'visible' } }}>
                    X
                  </IconButton>
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
