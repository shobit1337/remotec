import React from 'react';

import BackupTableIcon from '@mui/icons-material/BackupTable';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Box, Container, Paper, Stack } from '@mui/material';

const flexCenter = { display: 'flex', alignItems: 'center', justifyContent: 'center' };

const ProjectFilesPage = () => {
  return (
    <Container maxWidth={false} sx={{ ...flexCenter }}>
      {/* <Paper variant='outlined' sx={{ ...flexCenter, width: '30rem', height: '20rem' }}>
        <Stack
          sx={{
            alignItems: 'center',
            gap: '2rem',
            textAlign: 'center',
          }}>
          <BackupTableIcon fontSize='large' />
          All attachments to tasks & messages in this project will appear here.
        </Stack>
      </Paper> */}
      <Box
        sx={{
          justifyContent: 'space-between',
          p: '2rem',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e) => (
          <Paper
            variant='outlined'
            sx={{
              cursor: 'pointer',
            }}>
            <Box
              sx={{
                p: '5px',
                justifyContent: 'space-between',
                display: 'flex',
              }}>
              title
              <FilePresentIcon />
            </Box>
            <img
              src={`${'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}?w=248&fit=crop&auto=format`}
            />
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default ProjectFilesPage;
