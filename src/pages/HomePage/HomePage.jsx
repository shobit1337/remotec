import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Button,
  Container,
  Grid,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/material';

import date from 'date-and-time';

import { ProjectModal } from '../../components';
import { useAuth, useWorkspace } from '../../context';
import { flexCenter } from '../../styles/commonObjectStyles';
import { getDate, getDay } from '../../utils';
import { getAllWorkspaceMembers } from '../../utils/members';
import { getAllProjects } from '../../utils/project';
import { getUserNotes, updateUserNotes } from '../../utils/userNote';
import NewMeetingForm from '../MeetingsPage/components/NewMeetingForm';

const paperSx = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  p: 3,
};

const greetinOfTheDay = (() => {
  const hr = date.format(new Date(), 'HH');
  if (hr >= 0 && hr < 12) {
    return 'Good morning';
  } else if (hr === 12) {
    return 'Good noon';
  } else if (hr >= 12 && hr <= 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
})();

const getTodaysDate = (() => {
  return `${getDay()}, ${getDate(new Date())}`;
})();

const HomePage = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [meetForm, setMeetForm] = useState(false);
  const [finalMeeting, setFinalMeeting] = useState({});
  const [email, setEmail] = useState('');
  const [workMates, setWorkMates] = useState([]);
  const [noteInput, setNotesInput] = useState('');
  const [isProjectModelOpen, setIsProjectModelOpen] = useState(false);
  const toggleOpen = () => setIsProjectModelOpen((state) => !state);
  const { workspace } = useWorkspace();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleClickOpenClose = () => {
    setMeetForm((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const noteRes = await getUserNotes(currentUser?.uid);
      setNotesInput(noteRes);
    })();
  }, [currentUser]);

  useEffect(() => {
    if (workspace?.uid) {
      (async () => {
        const projectsRes = await getAllProjects(workspace?.uid);
        setProjects(projectsRes);
      })();
      (async () => {
        const workMatesRes = await getAllWorkspaceMembers(workspace?.uid);
        setWorkMates(workMatesRes);
      })();
    }
  }, [workspace]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: '100%' }}>
      <ProjectModal open={isProjectModelOpen} toggleOpen={toggleOpen} id={workspace?.uid} />
      <Typography gutterBottom align='center' variant='body1'>
        {getTodaysDate}
      </Typography>
      <Typography gutterBottom component='h2' align='center' variant='h4'>
        {greetinOfTheDay}, {currentUser.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6'>Notes</Typography>
            <TextField
              value={noteInput}
              onChange={(e) => setNotesInput(e.target.value)}
              sx={{
                width: '100%',
              }}
              multiline
              onKeyUp={(e) => {
                if (e.key === 'Enter') updateUserNotes(currentUser.uid, noteInput);
              }}
              onBlur={() => updateUserNotes(currentUser.uid, noteInput)}
              rows={16}
              variant='standard'
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            variant='outlined'
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' sx={{ marginBottom: '2rem' }} gutterBottom>
              Projects
            </Typography>
            <Grid container sx={{ height: '50vh', overflowY: 'auto' }}>
              <Grid
                onClick={toggleOpen}
                item
                xs={12}
                md={6}
                component={ListItemButton}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  height: 'max-content',
                }}>
                <Box
                  sx={{
                    ...flexCenter,
                    borderRadius: 2,
                    border: `2px dashed ${theme.palette.text.primary}`,
                    minWidth: '3rem',
                    height: '3rem',
                  }}>
                  <AddIcon />
                </Box>
                <Typography variant='h6'>Create Project</Typography>
              </Grid>
              {projects?.map((project) => (
                <Grid
                  onClick={() => navigate(`/team/${workspace.uid}/${project.uid}`)}
                  key={project?.uid}
                  component={ListItemButton}
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    height: 'max-content',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      bgcolor: project?.themeColor,
                      minWidth: '3rem',
                      height: '3rem',
                    }}>
                    <AccountTreeIcon />
                  </Box>
                  <Typography variant='h6'>{project.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: { xs: '4rem', md: '0rem' } }}>
          <Paper
            variant='outlined'
            sx={{
              ...paperSx,
            }}>
            <Typography variant='h6' gutterBottom>
              Workmates
            </Typography>
            <Stack direction='row' spacing={5}>
              {workMates.map((workMate) => (
                <Paper
                  key={workMate?.uid}
                  variant='outlined'
                  sx={{ ...flexCenter, height: '15rem', minWidth: '12rem' }}>
                  <Stack sx={{ alignItems: 'center' }} spacing={2}>
                    <Avatar
                      alt={workMate?.name}
                      src={workMate?.photoURL}
                      sx={{ width: '5rem', height: '5rem' }}
                    />
                    <Typography gutterBottom>{workMate?.name}</Typography>

                    {currentUser?.uid === workMate?.uid ? (
                      <Button size='small' variant='outlined' component={Link} to='/profile'>
                        view profile
                      </Button>
                    ) : (
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => {
                          handleClickOpenClose();
                          setEmail(workMate?.email);
                        }}>
                        Meeting
                      </Button>
                    )}
                    {meetForm && (
                      <NewMeetingForm
                        setFinalMeeting={setFinalMeeting}
                        handleClickOpenClose={handleClickOpenClose}
                        meetForm={meetForm}
                        memberEmail={email}
                      />
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
