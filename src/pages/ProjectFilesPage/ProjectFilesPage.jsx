import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BackupTableIcon from '@mui/icons-material/BackupTable';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Container, Fab, Paper, Stack } from '@mui/material';

import { flexCenter } from '../../styles/commonObjectStyles';
import { getSingleProjectData } from '../../utils/project';
import { deleteFile, uploadFile } from '../../utils/uploadFiles';

const ProjectFilesPage = () => {
  const { projectId } = useParams();

  const [projectFiles, setProjectFiles] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      const asaasa = await getSingleProjectData(projectId);
      setProjectFiles(asaasa.files);
      setFlag(!flag);
    })();
  }, [flag]);

  return (
    <Container
      sx={{
        marginTop: '2rem',
        marginBottom: { xs: '3rem', md: '0' },
        height: { md: `calc(100vh - 11rem)`, xs: `calc(100vh - 14.5rem)` },
        overflowY: 'auto',
        ...flexCenter,
      }}>
      {!!projectFiles.length ? (
        <Box
          columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
          sx={{
            p: '2rem',
            paddingTop: 0,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}>
          {projectFiles.map((file) => (
            <Paper
              key={file.url}
              sx={{
                cursor: 'pointer',
                height: 'max-content',
                maxWidth: 'max-content',
              }}>
              <Box
                sx={{
                  p: '5px',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                {file.name}
                <DeleteForeverIcon
                  onClick={(e) => {
                    console.log('sdsd');
                    e.stopPropagation();
                    deleteFile(file, projectId);
                  }}
                />
              </Box>
              <Box component={'a'} href={file.url} target='_blank' variant='outlined'>
                <Box
                  sx={{
                    maxWidth: '19rem',
                    height: 'auto',
                    maxHeight: '16rem',
                    objectFit: 'contain',
                  }}
                  component='img'
                  src={file.url}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper variant='outlined' sx={{ ...flexCenter, width: '30rem', height: '20rem' }}>
          <Stack
            sx={{
              alignItems: 'center',
              gap: '2rem',
              textAlign: 'center',
            }}>
            <BackupTableIcon fontSize='large' />
            All attachments to tasks & messages in this project will appear here.
          </Stack>
        </Paper>
      )}

      <Fab
        component='label'
        size='medium'
        color='primary'
        sx={{ position: 'fixed', bottom: '3rem', right: '3rem' }}>
        <UploadFileIcon />
        <input
          onChange={(e) => {
            uploadFile(e.target.files[0], projectId);
          }}
          accept='image/*'
          type='file'
          hidden
        />
      </Fab>
    </Container>
  );
};

export default ProjectFilesPage;
