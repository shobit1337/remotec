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
  const [isLoading, setIsLoading] = useState(true);
  const [userUpdated, setUserUpdated] = useState(true);
  const isLoggedIn = () => (currentUser?.email ? true : false);

  const refreshUser = () => setUserUpdated((state) => !state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        const userObj = await getDoc(doc(db, 'users', user.uid));
        setCurrentUser(userObj.data());
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userUpdated]);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userDetails = {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          workspace: [],
          tasks: [],
          meetings: [],
        };

        const isUserPresent = await getDoc(doc(db, 'users', userDetails.uid));
        if (!isUserPresent.data()) {
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
          name: user.name,
          email: result.user.email,
          photoURL: '',
          workspace: [],
          tasks: [],
          meetings: [],
        };
        const userRef = doc(collection(db, 'users'), result.user.uid);
        setDoc(userRef, {
          ...userDetails,
        });
        setCurrentUser(userDetails);
      })
      .catch((error) => {
        console.error('Failed to signup user, ', error);
      });
  };

  const signin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userDetails = {
          uid: result.user.uid,
          name: result.user.name,
          email: result.user.email,
          photoURL: result.user.email.photoURL,
          workspace: result.user.email,
          tasks: result.user.email,
          meetings: result.user.email,
        };
        setCurrentUser(userDetails);
      })
      .catch((error) => {
        console.error('Failed to authenticate email and password, ', error);
      });
  };

  const signout = async () => {
    localStorage.removeItem('token');
    return await signOut(auth).catch((error) => {
      console.error('Failed to signout user, ', error);
    });
  };

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    loginWithGoogle,
    isLoggedIn,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
