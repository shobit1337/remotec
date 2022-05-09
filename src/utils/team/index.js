import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../firebase/config';
import { addWorkspaceMember } from '../members';

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

    await addWorkspaceMember(code, user);
    return true;
  } else {
    return false;
  }
};

export const leaveWorkspace = async (workspaceId, userId) => {
  // remove userId from workspace
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  const workspace = workspaceDoc?.data();
  const updatedWorkspace = workspace.members.filter((member) => member !== userId);
  const workspaceRef = doc(collection(db, 'workspace'), workspaceId);
  await setDoc(
    workspaceRef,
    {
      workspace: [...updatedWorkspace],
    },
    { merge: true },
  );

  //remove workspceId from user
  const userRef = doc(collection(db, 'users'), userId);
  await setDoc(
    userRef,
    {
      workspace: [],
      tasks: [],
      meetings: [],
    },
    { merge: true },
  );
  console.log('success');
};

export const getWorkspace = async (workspaceId) => {
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  return workspaceDoc?.data();
};
