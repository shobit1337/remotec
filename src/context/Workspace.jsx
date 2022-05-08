import React, { createContext, useContext, useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/config';
import { useAuth } from './Auth';

const WorkspaceContext = createContext();

const WorkspaceProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    let unsub;
    if (currentUser) {
      // Listening to workspace changes and updating the workspace state
      unsub = onSnapshot(doc(db, 'workspace', currentUser?.workspace[0]), (doc) => {
        const data = doc.data();
        setWorkspace(data);
      });
    }
    return () => unsub();
  }, [currentUser]);

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { WorkspaceProvider, useWorkspace };
