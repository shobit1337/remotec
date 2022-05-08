import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { db } from '../../firebase/config';

export const getUserNotes = async (userId) => {
  const userRef = doc(collection(db, 'users'), userId);
  const userDoc = await getDoc(userRef);
  return userDoc.data()?.note;
};

export const updateUserNotes = async (userId, note) => {
  const userRef = doc(collection(db, 'users'), userId);
  await setDoc(
    userRef,
    {
      note,
    },
    { merge: true },
  );
};
