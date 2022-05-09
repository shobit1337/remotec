import { toast } from 'react-toastify';

import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { db } from '../../firebase/config';

export const getAllWorkspaceMembers = async (workspaceId) => {
  try {
    const allMembers = [];
    const q = query(collection(db, 'users'), where('workspace', 'array-contains', workspaceId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allMembers.push(doc.data());
    });
    return allMembers;
  } catch (error) {
    toast.error('Cannot fetch members');
    return [];
  }
};

export const addWorkspaceMember = async (workspaceId, user) => {
  try {
    const userRef = await doc(collection(db, 'users'), user.uid);
    await setDoc(
      userRef,
      {
        workspace: [...user.workspace, workspaceId],
      },
      { merge: true },
    );
  } catch (error) {
    // toast.error('Cannot add worksspace member');
  }
};

export const removeWorkspaceMember = async (workspaceId, userId) => {
  // remove from workspace
  const workspaceDoc = await getDoc(doc(db, 'workspace', workspaceId));
  const allMembers = workspaceDoc?.data().members;
  const updatedMembersList = allMembers.filter((member) => member !== userId);
  const workspaceRef = doc(collection(db, 'workspace'), code);
  await setDoc(
    workspaceRef,
    {
      members: [...updatedMembersList],
    },
    { merge: true },
  );

  // remove from users
  const usersDoc = await getDoc(doc(db, 'users', userId));
  const allWorkspace = usersDoc?.data().workspace;
  const updatedWorkspaceList = allWorkspace.filter((workspace) => workspace !== workspaceId);
  const userRef = doc(collection(db, 'users'), userId);
  await setDoc(
    userRef,
    {
      workspace: [...updatedWorkspaceList],
    },
    { merge: true },
  );
};
