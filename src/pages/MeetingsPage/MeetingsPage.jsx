import React, { useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

import NewMeetingForm from './components/NewMeetingForm';

const MeetingsPage = () => {
  const [meeting, setMeeting] = useState({
    name: '',
    summary: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    needsMeetLink: false,
    attendees: [],
  });

  const gapi = window.gapi;
  gapi.load('client', () => {
    console.log('loaded client');

    // const CLIENT_ID = '976439338379-ddv0i53kracqq6dai54mlunomgen30jl.apps.googleusercontent.com';
    // const API_KEY = 'AIzaSyDgWwLJs73HaIHN25qGvKJBEIas2y0UhuE';
    const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES =
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar.events';

    gapi.client.init({
      apiKey: import.meta.env.VITE_API_KEY,
      clientId: import.meta.env.VITE_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
    gapi.client.load('calendar', 'v3', () => console.log('bam!'));
  });
  async function loginHandler() {
    const googleAuth = gapi.auth2.getAuthInstance();
    console.log(googleAuth);
    const googleUser = await googleAuth.signIn();
    console.log(googleUser);
  }
  return (
    <div>
      <Button onClick={loginHandler}>Login with Google to sync calendar events</Button>
      <NewMeetingForm meeting={meeting} setMeeting={setMeeting} />
    </div>
  );
};

export default MeetingsPage;
