import React, { useState } from 'react';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const NewMeetingForm = ({ meeting, setMeeting }) => {
  const [open, setOpen] = useState(false);
  const [attendee, setAttendee] = React.useState([]);

  const handleClickOpenClose = () => {
    setOpen((prev) => !prev);
  };

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

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpenClose}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClickOpenClose} fullWidth scroll='paper'>
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
        <form onSubmit={(e) => e.preventDefault()}>
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
            <Button type='submit' variant='contained' onClick={handleClickOpenClose}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NewMeetingForm;
