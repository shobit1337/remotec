import React from 'react';

import { Button, Dialog, DialogTitle, Stack } from '@mui/material';

const RemoveUserModal = ({ toggleOpen, open }) => {
  return (
    <Dialog
      open={open}
      onClose={toggleOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        Are you sure you want to remove the user from team?
      </DialogTitle>
      <Stack direction='row' gap='1rem' sx={{ margin: '0 1rem 1rem 1rem' }}>
        <Button variant='contained' onClick={toggleOpen}>
          Cancel
        </Button>
        <Button variant='contained' color='error'>
          Remove
        </Button>
      </Stack>
    </Dialog>
  );
};

export default RemoveUserModal;
