import React, { useEffect, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';

import { FloatingButton } from '../../components';
import { useAuth, useWorkspace } from '../../context';
import { getAllUserTasks } from '../../utils/tasks';
import MyTaskModal from './components/MyTaskModal';

const MyTaskPage = () => {
  const { currentUser } = useAuth();
  const { projectList } = useWorkspace();
  const [myTasks, setMyTasks] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const tiggerRefresh = () => setRefresh((state) => !state);

  const toggleClose = () => {
    setIsModalOpen(false);
    setSelectedTasks(null);
  };

  const findProjectName = (id) => {
    return projectList?.find((item) => item.uid === id)?.name;
  };

  useEffect(() => {
    // Get getAllUserTasks
    (async () => {
      const data = await getAllUserTasks(currentUser.uid);
      setMyTasks(data);
    })();
  }, [currentUser, refresh]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'auto',
          margin: '1rem 0',
          height: `calc(100vh - 13rem)`,
        }}>
        <Table stickyHeader sx={{ minWidth: 550 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              <TableCell align='center'>Due Date</TableCell>
              <TableCell align='center'>Projects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myTasks?.map((task) => (
              <TableRow
                key={task.uid}
                onClick={() => {
                  setSelectedTasks(task);
                  setIsModalOpen(true);
                }}
                sx={{ cursor: 'pointer' }}>
                <TableCell component='th' scope='row'>
                  {task.name}
                </TableCell>
                <TableCell align='center'>
                  {task.date && task.date?.toDate().toDateString()}
                </TableCell>
                <TableCell align='center'>{findProjectName(task.projectId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <MyTaskModal
        open={isModalOpen}
        toggleClose={() => {
          toggleClose();
          tiggerRefresh();
        }}
        task={selectedTasks}
      />
    </>
  );
};

export default MyTaskPage;
