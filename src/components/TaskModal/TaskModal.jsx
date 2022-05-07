import React, { useState } from 'react';

import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { green, indigo, orange, red } from '@mui/material/colors';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TaskModal = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [progress, setProgress] = useState('');
  const [details, setDetails] = useState({ name: '', description: '', date: new Date() });

  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleClickOpenClose = () => {
    setOpen((prev) => !prev);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };
  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpenClose}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        width='lg'
        onClose={handleClickOpenClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogContent sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <TextField
              id='standard-multiline-static'
              label='Task name'
              multiline
              maxRows={3}
              variant='standard'
              value={details.name}
              onChange={(e) => setFieldInput('name', e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Due date'
                value={details.date}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => setFieldInput('date', newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              maxRows={5}
              variant='standard'
              value={details.description}
              onChange={(e) => setFieldInput('description', e.target.value)}
            />
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='status'>Status</InputLabel>
              <Select labelId='status' value={status} onChange={handleStatusChange} label='Status'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='To do'>
                  <Chip label='To do' size='small' sx={{ backgroundColor: red[300] }} />
                </MenuItem>
                <MenuItem value='Done'>
                  <Chip label='Done' size='small' sx={{ backgroundColor: green[300] }} />
                </MenuItem>
                <MenuItem value='Doing'>
                  <Chip label='Doing' size='small' sx={{ backgroundColor: orange[300] }} />
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='priority'>Priority</InputLabel>
              <Select
                labelId='priority'
                value={priority}
                onChange={handlePriorityChange}
                label='Priority'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='Low'>
                  <Chip label='Low' size='small' sx={{ backgroundColor: green[300] }} />
                </MenuItem>
                <MenuItem value='Medium'>
                  <Chip label='Medium' size='small' sx={{ backgroundColor: orange[300] }} />
                </MenuItem>
                <MenuItem value='High'>
                  <Chip label='High' size='small' sx={{ backgroundColor: red[300] }} />
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='progress'>Progress</InputLabel>
              <Select
                labelId='progress'
                value={progress}
                onChange={handleProgressChange}
                label='Progress'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='On track'>
                  <Chip label='On track' size='small' sx={{ backgroundColor: green[300] }} />
                </MenuItem>
                <MenuItem value='Off track'>
                  <Chip label='Off track' size='small' sx={{ backgroundColor: orange[300] }} />
                </MenuItem>
                <MenuItem value='Bug'>
                  <Chip label='Bug' size='small' sx={{ backgroundColor: red[300] }} />
                </MenuItem>
                <MenuItem value='Need help'>
                  <Chip label='Need help' size='small' sx={{ backgroundColor: indigo[300] }} />
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClickOpenClose} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskModal;
