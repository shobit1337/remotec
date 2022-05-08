import React from 'react';

import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { Button, Link, Paper, Stack, Typography } from '@mui/material';
import { grey, indigo, lightGreen, pink, teal } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { getDate, getDateTime } from '../../../utils';

const EventCard = ({ event }) => {
  const colors = [indigo, teal, lightGreen, pink];

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const randColor = colors[Math.floor(Math.random() * 4)];
  return (
    <div>
      <Paper sx={{ width: 250 }}>
        <Stack spacing={0}>
          <Div align='center' sx={{ backgroundColor: randColor[400] }}>
            {getDate(event.start.dateTime || event.start.date)}
          </Div>
          <Stack className='event-box'>
            <Typography variant='h6' className='ellipsis'>
              {event.summary}
            </Typography>
            <Typography variant='subtitle2' sx={{ color: grey[500] }}>
              {event.start.dateTime &&
                `${getDateTime(event.start.dateTime)} - ${getDateTime(event.end.dateTime)}`}
            </Typography>
            <Typography variant='subtitle1'>{event.location}</Typography>
            <Typography noWrap variant='subtitle1'>
              {event.description}
            </Typography>
            <Typography variant='subtitle1'>
              {event.hangoutLink && (
                <Button
                  variant='text'
                  target='_blank'
                  href={`${event.hangoutLink}`}
                  endIcon={<PhotoCameraFrontIcon />}>
                  Join meeting
                </Button>
              )}
            </Typography>
            <Button
              variant='contained'
              sx={{
                backgroundColor: randColor[300],
                marginTop: '0.5rem',
                '&:hover': {
                  background: randColor[400],
                },
              }}>
              <Link color='inherit' target='_blank' underline='none' href={`${event.htmlLink}`}>
                VIEW DETAILS
              </Link>
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
};

export default EventCard;
