import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import FloatingButton from '../../../components/FloatingButton/FloatingButton';
import { useWorkspace } from '../../../context';
import { getAllWorkspaceMembers } from '../../../utils/members';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'OliverHansen@gmail.com',
//   'VanHenry@mui.com',
//   'AprilTucker@mdeu.com',
//   'RalphHubbard@jndejkmd.com',
//   'OmarAlexander@ude.com',
//   'CarlosAbbott@example.com',
//   'MiriamWagner@new.com',
//   'BradleyWilkerson@jnef.com',
//   'VirginiaAndrews@efkm.com',
//   'Kelly@Snyder.com',
// ];

const NewMeetingForm = ({ setFinalMeeting, handleClickOpenClose, meetForm, memberEmail = '' }) => {
  const [meeting, setMeeting] = useState({
    name: '',
    summary: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    needsMeetLink: false,
    attendees: [],
  });
  const [names, setNames] = useState([]);
  const [attendee, setAttendee] = useState(memberEmail ? [memberEmail] : []);
  const { workspace } = useWorkspace();

  const setMeetingHandler = (field, value) => {
    setMeeting({ ...meeting, [field]: value });
  };

  const attendeesHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAttendee(value);
    const attendeesInDesiredFormat = value.map((item) => {
      return {
        email: item,
      };
    });
    setMeeting({
      ...meeting,
      attendees: attendeesInDesiredFormat,
    });
  };
  const createEventHandler = async (e) => {
    e.preventDefault();
    let event = {
      summary: meeting.name,
      location: meeting.location,
      description: meeting.summary,
      start: {
        dateTime: new Date(meeting.startTime).toISOString(),
      },
      end: {
        dateTime: new Date(meeting.endTime).toISOString(),
      },
      attendees: meeting.attendees,
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 10 }],
      },
    };
    const eventWithConference = {
      conferenceData: {
        createRequest: {
          requestId: 'JksKJJSK1KJSndjennjnjeK',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };
    if (meeting.needsMeetLink) {
      event = {
        ...event,
        ...eventWithConference,
      };
    }

    let request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });
    request.execute((event) => {
      console.log(event);
      setFinalMeeting(event);
      handleClickOpenClose();
      setMeeting({
        name: '',
        summary: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
        needsMeetLink: false,
        attendees: [],
      });
    });
  };

  useEffect(() => {
    (async () => {
      const temp = await getAllWorkspaceMembers(workspace.uid);
      temp.forEach((user) => setNames((prev) => [...prev, user.email]));
    })();
  }, [workspace.uid]);
  return (
    <div>
      <FloatingButton onClick={handleClickOpenClose} />
      <Dialog open={meetForm} onClose={handleClickOpenClose} fullWidth scroll='paper'>
        <DialogTitle>Schedule a meeting</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClickOpenClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
        <form onSubmit={createEventHandler}>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                label='Title of the event'
                variant='standard'
                value={meeting.name}
                onChange={(e) => setMeetingHandler('name', e.target.value)}
                required
              />
              <TextField
                label='Summary'
                variant='standard'
                value={meeting.summary}
                onChange={(e) => setMeetingHandler('summary', e.target.value)}
              />
              <TextField
                label='Location'
                variant='standard'
                value={meeting.location}
                onChange={(e) => setMeetingHandler('location', e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label='Start date - time'
                  value={meeting.startTime}
                  onChange={(newVal) => setMeetingHandler('startTime', newVal)}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label='End date - time'
                  value={meeting.endTime}
                  onChange={(newVal) => setMeetingHandler('endTime', newVal)}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel id='attendees'>Attendees</InputLabel>
                <Select
                  labelId='attendees'
                  multiple
                  value={attendee}
                  onChange={attendeesHandleChange}
                  input={<OutlinedInput label='Attendees' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}>
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                value='end'
                control={
                  <Checkbox
                    checked={meeting.needsMeetLink}
                    onChange={() => {
                      setMeeting({ ...meeting, needsMeetLink: !meeting.needsMeetLink });
                    }}
                  />
                }
                label='Do you want a Google meet link to be generated?'
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type='submit' variant='contained'>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NewMeetingForm;
