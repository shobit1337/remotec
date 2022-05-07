import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import image from '../../../public/images/pageNotFound.svg';
import { flexCenterColumn } from '../../styles/commonObjectStyles';

const PageNotFound = () => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        ...flexCenterColumn,
      }}>
      <Box sx={{ width: '30rem' }}>
        <img src={image} alt='page not found' />
      </Box>
      <Typography variant='h3'>The you are looking for is missing</Typography>
    </Container>
  );
};

export default PageNotFound;
