import React, { useState } from 'react';
import { toast } from 'react-toastify';

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

import { createProject } from '../../utils/project';

const projectColors = [
  { code: '#BFBCBC', name: 'Silver' },
  { code: '#EB6868', name: 'Burnt Sienna' },
  { code: '#E3886D', name: 'Copperfield' },
  { code: '#E7B568', name: 'Porsche' },
  { code: '#F2DA6F', name: 'Golden Sand' },
  { code: '#A9C953', name: 'Celery' },
  { code: '#539B7E', name: 'Aqua Forest' },
  { code: '#4ABEB7', name: 'Fountain Blue' },
  { code: '#99DFDB', name: 'Morning Glory' },
  { code: '#526DC6', name: 'Indigo' },
  { code: '#867DDC', name: 'Chetwode Blue' },
  { code: '#F1A5E8', name: 'Lavender Magenta' },
  { code: '#E66AA9', name: 'Deep Blush' },
  { code: '#4DB6AC', name: 'Verdigris' },
  { code: '#7CB342', name: 'Sushi' },
  { code: '#8D6E63', name: 'Cement' },
];

const ProjectModal = ({ open, toggleOpen, id }) => {
  const [details, setDetails] = useState({ name: '', description: '', themeColor: '' });
  const setFieldInput = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const res = await createProject(details, id);
    if (res !== null) {
      console.log('something');
      setDetails({ name: '', description: '', themeColor: '' });
      toast.success('Project Created Successfully');
    } else toast.error('Cannot create project');
    toggleOpen();
  };

  return (
    <div>
      <Dialog
        open={open}
        width='lg'
        onClose={toggleOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Create a new project</DialogTitle>
        <form style={{ width: '100%' }} onSubmit={handleCreateProject}>
          <DialogContent sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <TextField
                id='standard-multiline-static'
                label='Project name'
                multiline
                required
                maxRows={2}
                variant='standard'
                value={details.name}
                onChange={(e) => setFieldInput('name', e.target.value)}
              />
              <TextField
                id='standard-multiline-static'
                label='Project description'
                multiline
                maxRows={5}
                variant='standard'
                value={details.description}
                onChange={(e) => setFieldInput('description', e.target.value)}
              />
              <FormControl required variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='progress'>Theme Color</InputLabel>
                <Select
                  labelId='Theme Color'
                  value={details.themeColor}
                  onChange={(e) => setFieldInput('themeColor', e.target.value)}
                  label='Theme Color'>
                  {projectColors.map((color) => (
                    <MenuItem key={color.code} value={color.code}>
                      <Chip
                        label={color.name}
                        size='small'
                        sx={{ backgroundColor: color.code, color: '#000' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            {/* {id ? (
            <>
              <Button variant='contained' onClick={toggleOpen}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={toggleOpen}>
                Delete
              </Button>
            </>
          ) : ( */}
            <Button variant='contained' type='submit'>
              Create
            </Button>
            {/* )} */}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
