import { Image } from './Image';

export interface UserModel {
  uid: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  phoneVerified: boolean;
  profileImg: Image | null;
  dob: string;
  state: string;
  country: string;
  isPremium: boolean;
  ticketBalance: number;
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
  phoneVerified: false,
  profileImg: null,
  verified: false,
  dob: '',
  state: '',
  country: '',
  isPremium: false,
  ticketBalance: 0,
  myGames: [],
  deletion: false,
  deletionTS: '',
  createdTS: ''
};
