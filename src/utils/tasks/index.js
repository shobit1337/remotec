import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../firebase/config';

export const getAllProjectTasks = async (projectId) => {
  const allTasks = [];
  const q = query(collection(db, 'projects'), where('projectId', '==', projectId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTasks.push(doc.data());
  });
  return allTasks;
};

export const createProjectTask = async (data, workspaceId, projectId, userId) => {
  const taskObj = {
    ...data,
    uid: uuid(),
    createdAt: new Date(),
    workspaceId: workspaceId,
    projectId: projectId,
  };

  const userDoc = await getDoc(doc(db, 'users', userId));
  const user = userDoc?.data();

  const tasksRef = doc(collection(db, 'tasks'), taskObj.uid);
  await setDoc(tasksRef, {
    ...taskObj,
  });

  if (userId) {
    const userRef = doc(collection(db, 'users'), userId);
    await setDoc(
      userRef,
      {
        tasks: [...user.tasks, taskObj.uid],
      },
      { merge: true },
    );
  }
};

export const assignTask = async () => {};
