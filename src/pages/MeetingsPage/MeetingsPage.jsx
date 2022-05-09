import React, { useEffect, useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Masonry } from '@mui/lab';
import { Button, Container, Typography } from '@mui/material';

import { FloatingButton } from '../../components';
import EventCard from './components/EventCard';
import NewMeetingForm from './components/NewMeetingForm';

const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar.events';

const MeetingsPage = () => {
  const [eventsFromUser, setEventsFromUser] = useState([]);
  const [meetForm, setMeetForm] = useState(false);
  const [finalMeeting, setFinalMeeting] = useState({});
  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem('googleUser')) || {},
  );
  const handleClickOpenClose = () => {
    setMeetForm((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const gapi = window?.gapi;
      const promise = new Promise((resolve) => {
        gapi.load('client', async () => {
          console.log('loaded client');
          gapi.client.init({
            apiKey: import.meta.env.VITE_API_KEY,
            clientId: import.meta.env.VITE_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          });
          await gapi.client.load('calendar', 'v3', () => {
            console.log('bam!');
            resolve('resolved');
          });
        });
      });
      await Promise.resolve(promise);
      if (googleUser) {
        console.log('calling events');
        const events = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 15,
          orderBy: 'startTime',
        });
        console.log(events.result.items);
        setEventsFromUser(events.result.items);
      }
    })();
  }, [finalMeeting, googleUser]);

  async function loginHandler() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUs = await googleAuth.signIn();
    console.log(googleUs);
    setGoogleUser(googleUs);
    localStorage.setItem('googleUser', JSON.stringify(googleUs));
  }

  return (
    <div>
      <Container
        sx={{
          minHeight: { xs: `calc(100vh - 14.5rem)`, md: `calc(100vh - 11rem)` },
          width: '100%',
          paddingBottom: '5rem',
        }}
        maxWidth='xl'
        disableGutters>
        {/* {!googleUser && ( */}
        <Button
          variant='contained'
          onClick={loginHandler}
          startIcon={<GoogleIcon />}
          sx={{ position: 'fixed', top: '5rem', right: '3rem', borderRadius: '1rem' }}>
          Login
        </Button>
        {/* )} */}
        <FloatingButton onClick={handleClickOpenClose} />
        {meetForm && (
          <NewMeetingForm
            setFinalMeeting={setFinalMeeting}
            handleClickOpenClose={handleClickOpenClose}
            meetForm={meetForm}
          />
        )}
        {eventsFromUser.length > 0 ? (
          <Masonry columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }} spacing={5}>
            {eventsFromUser.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Masonry>
        ) : (
          <Typography variant='h6'>
            Nothing to show! Add events or login via your Google account
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default MeetingsPage;
