import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../firebase/config';

export const getAllProjectTasks = async (projectId) => {
  const allTasks = [];
  const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTasks.push(doc.data());
  });
  return allTasks;
};
export const getAllUserTasks = async (userId) => {
  const allTasks = [];
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.createdBy === userId || data?.assigned?.uid === userId) {
      allTasks.push(data);
    }
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

  // New task pushed to tasks
  const tasksRef = doc(collection(db, 'tasks'), taskObj.uid);
  await setDoc(tasksRef, {
    ...taskObj,
  });

  if (projectId) {
    const projectDoc = await getDoc(doc(db, 'projects', projectId));
    const project = projectDoc?.data();
    // Add task to project's tasks:
    const projectsRef = doc(collection(db, 'projects'), projectId);
    await setDoc(
      projectsRef,
      {
        tasks: [...project.tasks, taskObj.uid],
      },
      { merge: true },
    );
  }
  // If there is assigned then add task to his tasks
  if (userId) {
    // Getting Assigned user Doc
    const userDoc = await getDoc(doc(db, 'users', userId));
    const user = userDoc?.data();
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

export const updateProjectTask = async (data, newAssigned = null, prevAssigned = null) => {
  // Update tasks
  const tasksRef = doc(collection(db, 'tasks'), data.uid);
  await setDoc(
    tasksRef,
    {
      ...data,
    },
    { merge: true },
  );

  // If prev !== new
  if (newAssigned && prevAssigned && newAssigned !== prevAssigned) {
    // Add to new
    // Getting Assigned user Doc
    const newUserDoc = await getDoc(doc(db, 'users', newAssigned));
    const newUser = newUserDoc?.data();
    const newUserRef = doc(collection(db, 'users'), newAssigned);
    await setDoc(
      newUserRef,
      {
        tasks: [...newUser.tasks, data.uid],
      },
      { merge: true },
    );

    // Remove from Old
    const oldUserDoc = await getDoc(doc(db, 'users', prevAssigned));
    const oldUser = oldUserDoc?.data();
    const updatedTasks = oldUser.tasks.filter((task) => task !== data.uid);
    const oldUserRef = doc(collection(db, 'users'), prevAssigned);
    await setDoc(
      oldUserRef,
      {
        tasks: updatedTasks,
      },
      { merge: true },
    );
  }
};
export const deleteProjectTask = async (data) => {
  // Remove from tasks
  await deleteDoc(doc(db, 'tasks', data.uid));
  // Remove from projects
  const projectDoc = await getDoc(doc(db, 'projects', data.projectId));
  const project = projectDoc?.data();
  const updatedProjectTasks = project.tasks.filter((task) => task !== data.uid);
  const projectsRef = doc(collection(db, 'projects'), data.projectId);
  await setDoc(
    projectsRef,
    {
      tasks: updatedProjectTasks,
    },
    { merge: true },
  );

  // If assigned ? remove from user
  const userId = data?.assigned?.uid || null;
  if (userId) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const user = userDoc?.data();
    const updatedTasks = user.tasks.filter((task) => task !== data.uid);
    const userRef = doc(collection(db, 'users'), userId);
    await setDoc(
      userRef,
      {
        tasks: updatedTasks,
      },
      { merge: true },
    );
  }
};
