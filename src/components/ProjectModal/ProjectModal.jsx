import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { createProject } from '../../utils/project';

const defaultProjectDetails = { name: '', description: '' };

const ProjectModal = ({ open, toggleOpen, id }) => {
  const [details, setDetails] = useState(defaultProjectDetails);

  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const res = await createProject(details, id);
    toggleOpen();
    setDetails(defaultProjectDetails);
  };

  return (
    <div>
      <Dialog
        open={open}
        width='lg'
        onClose={toggleOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Create a new project</DialogTitle>
        <form style={{ width: '100%' }} onSubmit={handleCreateProject}>
          <DialogContent sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <TextField
                id='standard-multiline-static'
                label='Project name'
                multiline
                maxRows={2}
                variant='standard'
                value={details.name}
                onChange={(e) => setFieldInput('name', e.target.value)}
              />
              <TextField
                id='standard-multiline-static'
                label='Project description'
                multiline
                maxRows={5}
                variant='standard'
                value={details.description}
                onChange={(e) => setFieldInput('description', e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            {/* {id ? (
            <>
              <Button variant='contained' onClick={toggleOpen}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={toggleOpen}>
                Delete
              </Button>
            </>
          ) : ( */}
            <Button variant='contained' type='submit'>
              Create
            </Button>
            {/* )} */}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
