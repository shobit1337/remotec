import React from 'react';

import { FloatingButton, TasksTable } from '../../components';
import { useProject } from '../../context';

const ProjectTaskPage = () => {
  const { toggleOpen } = useProject();
  return (
    <>
      <TasksTable />
      <FloatingButton onClick={toggleOpen} />
    </>
  );
};

export default ProjectTaskPage;
