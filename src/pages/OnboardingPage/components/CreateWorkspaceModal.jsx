import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { grey, orange } from '@mui/material/colors';

import { BootstrapDialog, BootstrapDialogTitle } from '../../../components';
import { useAuth } from '../../../context';
import { flexCenter, flexCenterColumn } from '../../../styles/commonObjectStyles';
import { createWorkspace } from '../../../utils/team';

const CreateWorkspaceModal = () => {
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateWorkspace = (e) => {
    e.preventDefault();
    createWorkspace(name, description, currentUser).then((workspace) => {
      refreshUser();
      navigate('/home');
    });
  };

  return (
    <div>
      <Box sx={{ ...flexCenterColumn }}>
        <Box
          sx={{
            ...flexCenter,
            width: 100,
            height: 100,
            backgroundColor: orange[300],
            borderRadius: 4,
            cursor: 'pointer',
          }}
          onClick={handleClickOpen}>
          <GroupsIcon sx={{ fontSize: 80, color: grey[800] }} />
        </Box>
        <Typography variant='h6' mt={2}>
          Create a workspace
        </Typography>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' textAlign='center'>
          Create your workspace
        </BootstrapDialogTitle>
        <form style={{ width: '100%' }} onSubmit={handleCreateWorkspace}>
          <DialogContent dividers>
            <Box
              sx={{
                ...flexCenterColumn,
                '& > :not(style)': { m: 1, width: '25ch' },
              }}>
              <TextField
                id='standard-basic'
                label='Team name'
                variant='standard'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id='standard-multiline-static'
                label='Team description'
                multiline
                maxRows={4}
                variant='standard'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type='submit'>Join</Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
};

export { CreateWorkspaceModal };
