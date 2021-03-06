import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
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
        sx={{ padding: '1rem 1rem 0 1rem' }}>
        <Typography
          variant='h6'
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/team/${workspace.uid}`)}>
          {workspace?.name.toUpperCase()}
        </Typography>
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
            sx={{ py: 0 }}
            key={project.uid}>
            <SquareRoundedIcon
              sx={{ color: project?.themeColor, fontSize: '16px', marginRight: '1rem' }}
            />
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WorkspaceContainer;
