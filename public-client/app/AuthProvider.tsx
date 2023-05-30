'use client';

import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import { auth } from '../firebase';
import { DEFAULT, ToastData, UserModel } from '../data_models';
import { Firestore } from '../core';
import { AuthModelState } from '../constants/enums';

interface AuthContextType {
  user: UserModel | null;
  loading: boolean;
  toast: { open: boolean; data: ToastData | null };
  signup: (email: string, password: string) => void;
  login: (email: string, password: string, remember: boolean) => void;
  createUserWithGoogle: () => void;
  signout: () => void;
  openAuthModal: AuthModelState | false;
  updateAuthModalVisibility: (state: AuthModelState | false) => void;
  createToast: (data: ToastData) => void;
  dismissToast: () => void;
  savePlayerData: (
    name: string,
    dob: string,
    state: string,
    country: string
  ) => void;
  sendVerificationEmail: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  toast: { open: false, data: null },
  signup: (email: string, password: string) => {},
  login: (email: string, password: string, remember: boolean) => {},
  createUserWithGoogle: () => {},
  signout: () => {},
  openAuthModal: false,
  updateAuthModalVisibility: (state: AuthModelState | false) => {},
  createToast: (data: ToastData) => {},
  dismissToast: () => {},
  savePlayerData: (
    name: string,
    dob: string,
    state: string,
    country: string
  ) => {},
  sendVerificationEmail: () => {}
});

let timeOut: any = null;

export const AuthProvider = ({ children }) => {
  const [toast, setToast] = useState<{ open: boolean; data: ToastData | null }>(
    {
      open: false,
      data: null
    }
  );

  const [openAuthModal, setOpenAuthModal] = useState<AuthModelState | false>(
    false
  );
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createToast = (data: ToastData) => {
    setToast({
      open: true,
      data
    });
  };

  const dismissToast = () => {
    setToast({
      open: false,
      data: null
    });
  };

  const updateAuthModalVisibility = (state: AuthModelState | false) => {
    setOpenAuthModal(state);
  };

  const signup = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Successful Signup
      })
      .catch(error => {
        // handleRuntimeErrors(error, error.code);
      });
  }, []);

  const login = useCallback(
    (email: string, password: string, remember: boolean) => {
      const persistance = remember
        ? browserLocalPersistence
        : browserSessionPersistence;

      setPersistence(auth, persistance)
        .then(() => {
          signInWithEmailAndPassword(auth, email, password).catch(error => {
            // handleRuntimeErrors(error, error.code);
          });
        })
        .catch(error => {
          //   handleRuntimeErrors(error, error.code);
        });
    },
    []
  );

  const createUserWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // const signInMethod = isDesktop ? signInWithPopup : signInWithRedirect;
    signInWithPopup(auth, provider)
      .then(result => {})
      .catch(error => {
        // handleRuntimeErrors(error, error.code);
      });
  };

  const signout = () => {
    signOut(auth);
  };

  const savePlayerData = async (
    name: string,
    dob: string,
    state: string,
    country: string
  ) => {
    setLoading(true);
    const updatedUser: UserModel = {
      ...user,
      name,
      dob,
      state,
      country
    };

    await Firestore.User.updateUser(user.uid, updatedUser);
    setUser(updatedUser);
    setLoading(false);
  };

  const sendVerificationEmail = () => {
    if (auth?.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {})
        .catch(e => {
          // handleRuntimeErrors('Error in sending verification mail.');
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setLoading(true);
      if (user) {
        // check if the user id exists in firestore db
        let userData = await Firestore.User.getUser(user.uid);
        // if yes, then populate that in redux
        if (userData) {
          setUser(userData);
          // update email verified in firebase user collection
          if (userData.verified === false && user.emailVerified === true) {
            await Firestore.User.updateUser(userData.uid, {
              ...userData,
              verified: user.emailVerified
            });
            setUser({ ...userData, verified: user.emailVerified });
          }
        }
        // else create a default user and update that in redux
        else {
          const newUserData: UserModel = {
            ...DEFAULT.User,
            uid: user.uid,
            email: user.email || '',
            verified: user.emailVerified,
            createdTS: user.metadata.creationTime || '',
            phoneNumber: user.phoneNumber || null
          };
          await Firestore.User.createUser(user.uid, newUserData);
          setUser(newUserData);
          // send email verification mail
          if (user.emailVerified === false) {
            sendVerificationEmail();
          }
        }
      } else {
        // TODO - handle user not found
        setUser(null);
      }
      setLoading(false);
      updateAuthModalVisibility(false);
    });

    return () => unsubscribe();
  }, []);

  // Effect for clearing toast
  useEffect(() => {
    if (toast.open && !!toast.data) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        dismissToast();
        clearTimeout(timeOut);
      }, toast.data.duration || 3000);
    }
  }, [toast]);

  const contextValue = {
    user,
    loading,
    toast,
    signup,
    login,
    createUserWithGoogle,
    signout,
    openAuthModal,
    updateAuthModalVisibility,
    createToast,
    dismissToast,
    savePlayerData,
    sendVerificationEmail
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
