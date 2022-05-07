import { useState } from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';

import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../../components/BootstrapDialog/BootstrapDialog';
import { flexCenter, flexCenterColumn } from '../../../styles/commonObjectStyles';

const JoinWorkspaceModal = () => {
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
            backgroundColor: lightBlue[300],
            borderRadius: 4,
            cursor: 'pointer',
          }}
          onClick={handleClickOpen}>
          <GroupAddIcon sx={{ fontSize: 80, color: grey[800] }} />
        </Box>
        <Typography variant='h6' mt={2}>
          Join a workspace
        </Typography>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' textAlign='center'>
          Enter your workspace code
        </BootstrapDialogTitle>
        <form style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
          <DialogContent dividers>
            <Box
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}>
              <TextField id='standard-basic' label='Code' variant='standard' required />
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

export { JoinWorkspaceModal };
