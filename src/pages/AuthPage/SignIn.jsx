import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';

import GridImage from './components/GridImage';

const SignIn = () => {
  const [inputFieldValues, setInputFieldValues] = useState({ email: '', password: '' });
  const setFormFieldValues = (field, value) => {
    setInputFieldValues({ ...inputFieldValues, [field]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Grid container component='main' sx={{ padding: 0, minHeight: '100vh', width: '100%' }}>
        <GridImage />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box component='form' sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={inputFieldValues.email}
                  onChange={(e) => setFormFieldValues('email', e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={inputFieldValues.password}
                  onChange={(e) => setFormFieldValues('password', e.target.value)}
                />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 1 }}>
                  Sign In
                </Button>
                <Button type='click' fullWidth variant='contained' sx={{ mt: 1, mb: 2 }}>
                  Sign In with Google account
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='/' variant='body2' style={{ color: 'inherit' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/' variant='body2' style={{ color: 'inherit' }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
