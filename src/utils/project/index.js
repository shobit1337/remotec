import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../firebase/config';

export const getProjectData = async (workspaceId, projectId) => {
  const q = query(
    collection(db, 'projects'),
    where('uid', '==', projectId),
    where('workspaceId', '==', workspaceId),
  );
  const querySnapshot = await getDocs(q);
  let data;
  querySnapshot.forEach((doc, index) => {
    data = doc.data();
  });
  return data;
};

export const getSingleProjectData = async (projectId) => {
  const projectRef = doc(collection(db, 'projects'), projectId);
  let projectData = await getDoc(projectRef);
  return projectData.data();
};

export const createProject = async (details, workspaceId) => {
  const projectObj = {
    uid: uuid(),
    workspaceId,
    name: details.name,
    description: details.description,
    themeColor: details.themeColor || '',
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

export const addFileInProject = async (projectId, url, name) => {
  const projectRef = doc(collection(db, 'projects'), projectId);

  let projectData = await getSingleProjectData(projectId);

  await setDoc(
    projectRef,
    {
      files: [...projectData.files, { name, url }],
    },
    { merge: true },
  );
};

export const removeFileFromProject = async (projectId, url) => {
  const projectRef = doc(collection(db, 'projects'), projectId);

  let projectData = await getSingleProjectData(projectId);

  await setDoc(
    projectRef,
    {
      files: [...projectData.files.filter((ele) => ele.url !== url)],
    },
    { merge: true },
  );
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
