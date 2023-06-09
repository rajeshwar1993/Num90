import { GameEnv } from '@/constants/enums';
import { Prize } from './prize-model';

export interface GamePlayHistoryModel {
  uid: string;
  gameConnectId: string;
  gameUID: string;
  players: string[]; // uid of the players
  ticketCount: number;
  prizes: { [id: string]: Prize };
  gameEnv: GameEnv;
  city: string;
  state: string;
  country: string;
  createdTS: string;
  isFullGame: boolean;
  startTS: string;
  endTS: string;
}

export const DEFAULT_GamePlay: GamePlayHistoryModel = {
  uid: '',
  gameConnectId: '',
  gameUID: '',
  players: [],
  ticketCount: 0,
  prizes: {},
  gameEnv: GameEnv.PubOrBar,
  city: '',
  state: '',
  country: '',
  isFullGame: false,
  createdTS: '',
  startTS: '',
  endTS: ''
};
