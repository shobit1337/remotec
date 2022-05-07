import { useState } from 'react';

import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { grey, orange } from '@mui/material/colors';

import { BootstrapDialog, BootstrapDialogTitle } from '../../../components';
import { flexCenter, flexCenterColumn } from '../../../styles/commonObjectStyles';

const CreateWorkspaceModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          Create your worksapce
        </BootstrapDialogTitle>
        <form style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
          <DialogContent dividers>
            <Box
              sx={{
                ...flexCenterColumn,
                '& > :not(style)': { m: 1, width: '25ch' },
              }}>
              <TextField id='standard-basic' label='Team name' variant='standard' required />
              <TextField
                id='standard-multiline-static'
                label='Team description'
                multiline
                maxRows={4}
                variant='standard'
                required
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
