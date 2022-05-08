import React, { createContext, useContext, useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { CreateTaskModal } from '../components';
import { db } from '../firebase/config';
import { getAllProjectTasks } from '../utils/tasks';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projectId, setProjectId] = useState('');

  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
  const toggleOpen = () => {
    setIsTaskModelOpen(true);
  };
  const toggleClose = () => {
    setIsTaskModelOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (project?.uid)
      (async () => {
        const data = await getAllProjectTasks(project.uid);
        setProjectTask(data);
      })();
  }, [project]);

  useEffect(() => {
    //Listening to project changes and updating the workspace state
    let unsub = (e) => e;
    if (projectId)
      unsub = onSnapshot(doc(db, 'projects', projectId), (doc) => {
        const data = doc.data();
        if (data) {
          setProject(data);
        }
      });
    return () => unsub();
  }, [projectId]);

  return (
    <ProjectContext.Provider
      value={{ project, projectTasks, setProjectId, toggleOpen, toggleClose, setSelectedTask }}>
      {children}
      <CreateTaskModal
        open={isTaskModelOpen}
        toggleOpen={toggleOpen}
        toggleClose={toggleClose}
        task={selectedTask}
      />
    </ProjectContext.Provider>
  );
};

const useProject = () => useContext(ProjectContext);

export { ProjectProvider, useProject };
