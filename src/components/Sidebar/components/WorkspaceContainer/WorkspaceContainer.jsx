import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { useWorkspace } from '../../../../context';
import { getAllProjects } from '../../../../utils/project';
import ProjectModal from '../../../ProjectModal/ProjectModal';

const WorkspaceContainer = () => {
  const [isProjectModelOpen, setIsProjectModelOpen] = useState(false);
  const toggleOpen = () => setIsProjectModelOpen((state) => !state);
  const [projects, setProjects] = useState(null);
  const { workspace } = useWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    if (workspace?.uid) {
      (async () => {
        const projectsRes = await getAllProjects(workspace?.uid);
        setProjects(projectsRes);
      })();
    }
  }, [workspace]);

  return (
    <Box>
      <Divider />
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ padding: '1rem' }}>
        <Typography variant='h6'>{workspace?.name}</Typography>
        <IconButton onClick={toggleOpen}>
          <AddIcon />
        </IconButton>
      </Stack>
      <ProjectModal open={isProjectModelOpen} toggleOpen={toggleOpen} id={workspace?.uid} />
      {/* Project Lists */}
      <List>
        {projects?.map((project) => (
          <ListItem
            button
            onClick={() => navigate(`team/${workspace.uid}/${project.uid}`)}
            key={project.uid}>
            <CircleIcon sx={{ color: 'yellow', fontSize: '16px', marginRight: '1rem' }} />
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WorkspaceContainer;
