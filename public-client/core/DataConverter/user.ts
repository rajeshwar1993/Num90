import { UserModel } from '../../data_models';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore';

export const user_ToDB = (user: UserModel): DocumentData => {
  return user;
};

export const user_fromDB = (
  snapshot: QueryDocumentSnapshot,
  options: SnapshotOptions
): UserModel => {
  const data = snapshot.data(options)!;

  return data as UserModel;
};
