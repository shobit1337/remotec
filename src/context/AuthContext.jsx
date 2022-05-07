import { createContext, useContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '../firebase/config';

const provider = new GoogleAuthProvider();

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const isLoggedIn = () => (currentUser?.email ? true : false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userDetails = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          teams: [],
          tasks: [],
          meetings: [],
        };

        const isUserPresent = await getDoc(doc(db, 'users', userDetails.uid));
        if (!isUserPresent._document) {
          const userRef = await doc(collection(db, 'users'), userDetails.uid);
          await setDoc(userRef, {
            ...userDetails,
          });
        }

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        localStorage.setItem('token', token);
        setCurrentUser(userDetails);
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Failed to authenticate with google, ', error);
      });
  };

  const signup = async (user) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        const userDetails = {
          uid: result.user.uid,
          displayName: user.name,
          email: result.user.email,
          photoURL: '',
          teams: [],
          tasks: [],
          meetings: [],
        };
        const userRef = doc(collection(db, 'users'), result.user.uid);
        setDoc(userRef, {
          ...userDetails,
        });
      })
      .catch((error) => {
        console.error('Failed to authenticate email and password, ', error);
      });
  };

  const signin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signout = async () => {
    localStorage.removeItem('token');
    return await signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    loginWithGoogle,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
