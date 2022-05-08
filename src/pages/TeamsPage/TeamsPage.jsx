import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

import { ProjectModal } from '../../components';
import { useWorkspace } from '../../context';
import { getAllWorkspaceMemebers } from '../../utils/members';
import { getAllProjects } from '../../utils/project';
import { RemoveUserModal } from './components';

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const TeamsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { workspace } = useWorkspace();
  const [workMates, setWorkMates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isRemoveUseModelOpen, setIsRemoveUserModelOpen] = useState(false);
  const [isProjectModelOpen, setIsProjectModelOpen] = useState(false);

  const toggleProjectModalOpen = () => setIsProjectModelOpen((state) => !state);
  const toggleRemoveUserModalOpen = () => setIsRemoveUserModelOpen((prev) => !prev);

  useEffect(() => {
    if (workspace?.uid) {
      (async () => {
        const projectsRes = await getAllProjects(workspace?.uid);
        setProjects(projectsRes);
      })();
      (async () => {
        const workMatesRes = await getAllWorkspaceMemebers(workspace?.uid);
        setWorkMates(workMatesRes);
      })();
    }
  }, [workspace]);

  return (
    <Box>
      <ProjectModal
        open={isProjectModelOpen}
        toggleOpen={toggleProjectModalOpen}
        id={workspace?.uid}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography variant='h5'>Team Name</Typography>
        <Button title='Copy team code'>
          <Typography sx={{ fontSize: '0.8em' }}> Copy team code </Typography>
        </Button>
      </Box>

      <Stack
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '1rem',
          width: '100%',
          margin: '1rem 0rem',
        }}>
        <Paper sx={{ width: '100%', height: `calc(100vh - 13rem)` }}>
          <Typography variant='h6' sx={{ p: '1rem' }}>
            Projects
          </Typography>
          <Stack spacing='1' sx={{ p: '0 0.5rem', overflowY: 'auto', height: `calc(100% - 5rem)` }}>
            <ListItemButton onClick={toggleProjectModalOpen}>
              <Box
                sx={{
                  ...flexCenter,
                  borderRadius: 2,
                  border: `2px dashed ${theme.palette.text.primary}`,
                  minWidth: '3rem',
                  height: '3rem',
                  marginRight: '0.5rem',
                }}>
                <AddIcon />
              </Box>
              <ListItemText primary='Create Project' />
            </ListItemButton>

            {projects.map((project) => {
              return (
                <ListItemButton
                  onClick={() => navigate(`/team/${workspace.uid}/${project.uid}`)}
                  key={project.uid}>
                  <Box
                    sx={{
                      ...flexCenter,
                      borderRadius: 2,
                      bgcolor: project?.themeColor,
                      minWidth: '3rem',
                      height: '3rem',
                      marginRight: '0.5rem',
                    }}>
                    <AccountTreeIcon />
                  </Box>
                  <ListItemText primary={project.name} />
                </ListItemButton>
              );
            })}
          </Stack>
        </Paper>

        <Paper
          sx={{
            width: '100%',
            height: `calc(100vh - 13rem)`,
            marginBottom: { xs: '5rem', md: '0' },
          }}>
          <Typography variant='h6' sx={{ p: '1rem' }}>
            Members
          </Typography>
          <Stack
            alignItems='flex-start'
            spacing='1'
            sx={{ p: '0 0.5rem', overflowY: 'auto', height: `calc(100% - 5rem)` }}>
            {workMates.map((mate) => {
              return (
                <ListItemButton
                  key={mate.uid}
                  sx={{
                    width: '100%',
                    maxHeight: '4rem',
                    '&:hover #deleteBtn': {
                      visibility: 'visible',
                    },
                  }}>
                  <Avatar
                    sx={{
                      width: '3rem',
                      height: '3rem',
                      bgcolor: indigo[300],
                      marginRight: '1rem',
                    }}
                    alt='Profile Photo'
                    src={mate?.photoURL}
                  />
                  <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                    <Stack justifyContent='center'>
                      <ListItemText sx={{ margin: '0' }} primary={mate.name} />
                      <Typography> {mate.email} </Typography>
                    </Stack>
                    <IconButton
                      id='deleteBtn'
                      sx={{ visibility: { md: 'hidden', xs: 'visible' } }}
                      onClick={toggleRemoveUserModalOpen}>
                      <CloseIcon />
                    </IconButton>

                    <RemoveUserModal
                      open={isRemoveUseModelOpen}
                      toggleOpen={toggleRemoveUserModalOpen}
                    />
                  </Stack>
                </ListItemButton>
              );
            })}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default TeamsPage;
