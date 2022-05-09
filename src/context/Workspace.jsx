import React, { createContext, useContext, useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/config';
import { getAllProjects } from '../utils/project';
import { useAuth } from './Auth';

const WorkspaceContext = createContext();

const WorkspaceProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    if (workspace?.uid) {
      (async () => {
        const data = await getAllProjects(workspace.uid);
        setProjectList(data);
      })();
    }
  }, [workspace]);

  useEffect(() => {
    // Listening to workspace changes and updating the workspace state
    let unsub = (e) => e;
    if (currentUser?.workspace[0])
      unsub = onSnapshot(doc(db, 'workspace', currentUser?.workspace[0]), (doc) => {
        const data = doc.data();
        if (data) setWorkspace(data);
      });
    return () => unsub();
  }, [currentUser]);

  return (
    <WorkspaceContext.Provider value={{ workspace, projectList }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { WorkspaceProvider, useWorkspace };
