import React, { useState } from 'react';

import { CreateTaskModal, FloatingButton, TasksTable } from '../../components';

const ProjectTaskPage = () => {
  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
  const toggleOpen = () => setIsTaskModelOpen((state) => !state);
  return (
    <>
      <TasksTable />
      <FloatingButton onClick={toggleOpen} />
      <CreateTaskModal open={isTaskModelOpen} toggleOpen={toggleOpen} />
    </>
  );
};

export default ProjectTaskPage;
