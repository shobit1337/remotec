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

    await addWorkspaceMember(code, user.uid);
    return true;
  } else {
    return false;
  }
};

export const getWorkspace = async (workspaceId) => {
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  return workspaceDoc?.data();
};
