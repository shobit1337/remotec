import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { auth, db } from '../../firebase/config';

export const createWorkspace = async (name, description, user) => {
  const workspaceObj = {
    name,
    description,
    members: [user.uid],
    uid: uuid(),
    projects: [],
    owner: user.uid,
  };

  const workspaceRef = await doc(collection(db, 'workspace'), workspaceObj.uid);
  await setDoc(workspaceRef, {
    ...workspaceObj,
  });

  const userRef = await doc(collection(db, 'users'), user.uid);
  await setDoc(
    userRef,
    {
      workspace: [...user.workspace, workspaceObj.uid],
    },
    { merge: true },
  );
  return workspaceObj;
};

export const joinWorkspace = async (code, user) => {
  //check if code is valid
  const workspaceDoc = await getDoc(doc(db, 'workspace', code));
  const workspace = workspaceDoc?.data();
  if (workspace) {
    // update to workspaceDB
    const workspaceRef = doc(collection(db, 'workspace'), code);
    await setDoc(
      workspaceRef,
      {
        members: [...workspace.members, user.uid],
      },
      { merge: true },
    );

    // update to userDB
    const userRef = await doc(collection(db, 'users'), user.uid);
    await setDoc(
      userRef,
      {
        workspace: [...user.workspace, code],
      },
      { merge: true },
    );
    return true;
  } else {
    return false;
  }
};

export const getWorkspace = async (workspaceId) => {
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  return workspaceDoc?.data();
};

export const createProject = async (details, workspaceId) => {
  const projectObj = {
    uid: uuid(),
    workspaceId,
    name: details.name,
    description: details.description,
    tasks: [],
    files: [],
  };
  //check if code is valid
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  const workspace = workspaceDoc?.data();
  if (workspace) {
    const projectRef = await doc(collection(db, 'projects'), projectObj.uid);
    await setDoc(projectRef, {
      ...projectObj,
    });

    const workspaceRef = await doc(collection(db, 'workspace'), workspaceId);
    await setDoc(
      workspaceRef,
      {
        projects: [...workspace.projects, projectObj.uid],
      },
      { merge: true },
    );
    return projectObj;
  }
};

export const getAllProjects = async (workspaceId) => {
  const allProjects = [];
  const q = query(collection(db, 'projects'), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allProjects.push(doc.data());
  });
  return allProjects;
};
