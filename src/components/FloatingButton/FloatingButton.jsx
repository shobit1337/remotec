import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

const FloatingButton = () => {
  return (
    <Fab size='medium' color='primary' sx={{ position: 'fixed', bottom: '5rem', right: '4rem' }}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
