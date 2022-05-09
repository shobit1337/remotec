import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../../firebase/config';
import { addFileInProject, removeFileFromProject } from '../project';

export const uploadFile = async (file, projectId) => {
  const fileRef = ref(storage, `${projectId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  addFileInProject(projectId, downloadURL, file.name);
};

export const deleteFile = async (file, projectId) => {
  const fileRef = ref(storage, `${projectId}/${file.name}`);
  await deleteObject(fileRef);
  removeFileFromProject(projectId, file.url);
};
