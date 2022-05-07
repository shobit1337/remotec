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

const ProjectModal = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({ name: '', description: '' });
  const handleClickOpenClose = () => {
    setOpen((prev) => !prev);
  };

  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpenClose}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        width='lg'
        onClose={handleClickOpenClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Create a new project</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <TextField
              id='standard-multiline-static'
              label='Project name'
              multiline
              maxRows={3}
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
          <Button variant='contained' onClick={handleClickOpenClose} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
