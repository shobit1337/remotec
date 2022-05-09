import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

const FloatingButton = ({ onClick = (e) => e }) => {
  return (
    <Fab
      size='medium'
      color='primary'
      sx={{ position: 'fixed', bottom: '3rem', right: '3rem' }}
      onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
