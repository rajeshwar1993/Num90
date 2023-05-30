import { Image } from './Image';

export interface UserModel {
  uid: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  profileImg: Image | null;
  dob: string;
  state: string;
  country: string;
  isPremium: boolean;
  myGames: Array<string>; // string ids of owned games
  verified: boolean;
  deletion: boolean;
  deletionTS: string;
  createdTS: string;
}

export const DEFAULT_User: UserModel = {
  uid: 'DEFAULT_USER',
  name: '',
  email: '',
  phoneNumber: null,
  profileImg: null,
  verified: false,
  dob: '',
  state: '',
  country: '',
  isPremium: false,
  myGames: [],
  deletion: false,
  deletionTS: '',
  createdTS: ''
};
