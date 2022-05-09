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

import { useAuth, useWorkspace } from '../../../context';
import { createProjectTask, deleteProjectTask, updateProjectTask } from '../../../utils/tasks';

const MyTaskModal = ({ open, toggleClose, task = null }) => {
  const { currentUser } = useAuth();
  const [details, setDetails] = useState({
    name: '',
    description: '',
    date: new Date(),
    status: '',
    progress: '',
    priority: '',
    projectId: '',
  });

  const { workspace, projectList } = useWorkspace();

  const [assignedPerson, setAssignedPerson] = useState('');
  const [projectId, setProjectId] = useState('');

  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleCreateTask = async () => {
    if (details.name) {
      await createProjectTask(
        { ...details, projectId, assigned: { uid: currentUser.uid, name: currentUser.name } },
        workspace?.uid,
        projectId,
        task?.assigned?.uid,
      );
      toggleClose();
    }
  };

  const handleUpdate = async () => {
    if (details.name) {
      await updateProjectTask({ ...details, projectId });
      toggleClose();
    }
  };

  const handleDelete = async () => {
    await deleteProjectTask(task);
    toggleClose();
  };

  useEffect(() => {
    if (task) {
      setDetails({
        ...task,
        name: task.name,
        description: task.description,
        date: task.date,
        status: task.status,
        progress: task.progress,
        priority: task.priority,
        projectId: task.projectId,
      });
      setProjectId(task.projectId);
      setAssignedPerson(task?.assigned?.uid);
    }

    return () => {
      setDetails({
        name: '',
        description: '',
        date: new Date(),
        status: '',
        progress: '',
        priority: '',
      });
      setProjectId('');
      setAssignedPerson('');
    };
  }, [workspace?.uid, task]);

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        width='lg'
        onClose={toggleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {`${task ? 'Edit your task details' : 'Create a new task for you'}`}
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
            {/* Project */}
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='assigned'>Project</InputLabel>
              <Select
                labelId='assigned'
                defaultValue=''
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                label='assigned'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {projectList?.length > 0 &&
                  projectList?.map((project) => (
                    <MenuItem key={project.uid} value={project.uid}>
                      <Chip
                        label={project.name}
                        size='small'
                        sx={{ backgroundColor: green[300] }}
                      />
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
          </Stack>
        </DialogContent>
        <DialogActions>
          {task ? (
            <>
              <Button variant='contained' onClick={handleUpdate}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={handleDelete}>
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

export default MyTaskModal;
