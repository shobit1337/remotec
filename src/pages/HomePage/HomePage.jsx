import React from 'react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

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

const HomePage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Typography gutterBottom align='center' variant='body1'>
        Good afternoot, user
      </Typography>
      <Typography gutterBottom component='h2' align='center' variant='h4'>
        Good afternoot, user
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            elevation={3}
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6'>Notes</Typography>
            <TextField
              sx={{
                width: '100%',
              }}
              multiline
              rows={16}
              variant='standard'
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            elevation={3}
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' gutterBottom>
              Projects
            </Typography>
            <Grid
              container
              sx={{ height: '50vh', overflow: 'auto' }}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    border: `2px dashed ${theme.palette.text.primary}`,
                    width: '3rem',
                    height: '3rem',
                  }}>
                  <AddIcon />
                </Box>
                <Typography variant='h6'>Ddsfdfd</Typography>
              </Grid>
              {[1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2].map((e) => (
                <Grid
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
        <Grid item xs={12}>
          <Paper
            variant='outlined'
            elevation={3}
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' gutterBottom>
              Workmates
            </Typography>
            <Stack direction='row' spacing={5}>
              {[1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1].map((e) => (
                <Paper
                  variant='outlined'
                  sx={{ ...flexCenter, height: '15rem', minWidth: '12rem' }}>
                  <Stack sx={{ alignItems: 'center' }} spacing={2}>
                    <Avatar sx={{ width: '5rem', height: '5rem' }} />
                    <Typography gutterBottom>User Name</Typography>
                    <Button size='small' variant='outlined'>
                      Meeting
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
