import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import * as Constants from '../../constants/fbConstants';
import { user_ToDB, user_fromDB } from '../DataConverter/user';
import { UserModel } from '../../data_models';
import { UserKey } from '../../constants/dbKeys';

const userColRef = collection(db, Constants.USER_COLLECTION).withConverter({
  toFirestore: user_ToDB,
  fromFirestore: user_fromDB
});

export const getUser = async (userId: string) => {
  if (!userId) {
    throw Error('invalid argument');
  }

  const docRef = doc(userColRef, userId);

  const snap = await getDoc(docRef);

  if (!snap.exists) {
    throw Error('no doc found');
  }

  return snap.data();
};

export const createUser = async (userId: string, userData: UserModel) => {
  if (!userId || !userData) {
    throw Error('invalid argument');
  }

  const docRef = doc(userColRef, userId);

  await setDoc(docRef, {
    ...userData,
    [UserKey.createdTS]: serverTimestamp()
  });

  return true;
};

export const updateUser = async (userId: string, userData: UserModel) => {
  if (!userId || !userData) {
    throw Error('invalid argument');
  }

  let docRef = doc(userColRef, userId);

  await updateDoc(docRef, userData);

  return true;
};

export const deleteUser = async (userId: string) => {
  if (!userId) {
    throw Error('invalid argument');
  }

  let docRef = doc(userColRef, userId);

  await deleteDoc(docRef);

  return true;
};
