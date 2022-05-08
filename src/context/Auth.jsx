import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
        const userObj = await getDoc(doc(db, `users/${user.uid}`));
        const data = userObj.data();
        if (data) setCurrentUser(data);
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
        // If this is new user, add them to firestore
        const isUserPresent = await getDoc(doc(db, 'users', result.user.uid));
        if (!isUserPresent.data()) {
          const userDetails = {
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            workspace: [],
            tasks: [],
            meetings: [],
          };
          const userRef = await doc(collection(db, 'users'), userDetails.uid);
          await setDoc(userRef, {
            ...userDetails,
          });
          setCurrentUser(userDetails);
        }

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('token', token);
        toast.success('Logged In Successfully!');
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Failed to authenticate with google, ', error);
        toast.error('Failed to authenticate');
      });
  };

  const signup = async (user) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        const userRef = doc(collection(db, 'users'), result.user.uid);
        const userDetails = {
          uid: result.user.uid,
          name: user.name,
          email: result.user.email,
          photoURL: '',
          workspace: [],
          tasks: [],
          meetings: [],
        };
        setDoc(userRef, {
          ...userDetails,
        });
        toast.success('Signed Up Successfully!');
      })
      .catch((error) => {
        console.error('Failed to signup user, ', error);
        toast.error('Failed to Sign up');
      });
  };

  const signin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(toast.success((_) => 'Logged In Successfully!'))
      .catch((error) => {
        console.error('Failed to authenticate email and password, ', error);
        toast.error('Failed to Sign In');
      });
  };

  const signout = async () => {
    localStorage.removeItem('token');
    await signOut(auth).catch((error) => {
      console.error('Failed to signout user, ', error);
      toast.error('Failed to Sign Out');
    });
    toast.success('Logged Out Successfully!');
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
