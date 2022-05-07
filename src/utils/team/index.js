import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { auth, db } from '../../firebase/config';

export const createWorkspace = async (name, description, user) => {
  const workspaceObj = {
    name,
    description,
    members: [],
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
