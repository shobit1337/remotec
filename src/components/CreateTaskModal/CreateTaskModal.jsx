import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { green, indigo, orange, red } from '@mui/material/colors';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { getAllWorkspaceMemebers } from '../../utils/members';
import { createProjectTask } from '../../utils/tasks';

const CreateTaskModal = ({ open, toggleOpen, id = null }) => {
  const [details, setDetails] = useState({
    name: '',
    description: '',
    date: '',
    status: '',
    progress: '',
    priority: '',
  });

  const [membersList, setMembersList] = useState(null);
  const [assignedPerson, setAssignedPerson] = useState('');

  const { teamId, projectId } = useParams();
  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleCreateTask = async () => {
    if (details.name) {
      await createProjectTask(
        { ...details, assigned: assignedPerson },
        teamId,
        projectId,
        assignedPerson,
      );
    }
  };

  useEffect(() => {
    // Fetching workspace users list
    (async () => {
      const memeber = await getAllWorkspaceMemebers(teamId);
      setMembersList(memeber);
    })();

    // if (id) {
    // getTaskDetails
    // }

    return () => {
      setDetails({
        name: '',
        description: '',
        date: '',
        status: '',
        progress: '',
        priority: '',
      });
      setAssignedPerson(null);
      setMembersList('');
    };
  }, [teamId]);

  return (
    <div>
      <Dialog
        open={open}
        width='lg'
        onClose={toggleOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {
            // `${
            // id ? 'Edit task details' :
            'Create a new task'
            // }`
          }
        </DialogTitle>
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
            {/* Assigned Person */}
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='progress'>Progress</InputLabel>
              <Select
                labelId='assigned'
                defaultValue={''}
                value={assignedPerson}
                onChange={(e) => setAssignedPerson(e.target.value)}
                label='assigned'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {membersList?.map((member) => (
                  <MenuItem key={member.uid} value={member.uid}>
                    <Chip label={member.name} size='small' sx={{ backgroundColor: green[300] }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Due date'
                value={new Date()}
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
            {/* Status */}
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='status'>Status</InputLabel>
              <Select
                labelId='status'
                defaultValue={''}
                value={details.status}
                onChange={(e) => setFieldInput('status', e.target.value)}
                label='Status'>
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
            {/* Priority */}
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='priority'>Priority</InputLabel>
              <Select
                labelId='priority'
                defaultValue={''}
                value={details.priority}
                onChange={(e) => setFieldInput('priority', e.target.value)}
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
            {/* Progress */}
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='progress'>Progress</InputLabel>
              <Select
                labelId='progress'
                defaultValue={''}
                value={details.progress}
                onChange={(e) => setFieldInput('progress', e.target.value)}
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
            <Button variant='contained' component='label'>
              Upload File
              <input type='file' hidden />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {id ? (
            <>
              <Button variant='contained' onClick={toggleOpen}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={toggleOpen}>
                Delete
              </Button>
            </>
          ) : (
            <Button variant='contained' onClick={handleCreateTask}>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTaskModal;
