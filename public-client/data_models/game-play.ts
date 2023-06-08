import { BingoBoardCell } from './bingo-board';
import { GameMetaGlanceModel } from './game-meta';
import { Player } from './player';
import { GameState, GameEnv } from '../constants/enums';
import { Prize } from './prize-model';
import { Ticket } from './ticket';

export interface GamePlayModel {
  uid: string;
  gameState: GameState;
  gameConnectId: string;
  gameMeta: GameMetaGlanceModel | null;
  board: {
    [key: string]: BingoBoardCell;
  };
  lastFewNumbers: BingoBoardCell[];
  players: { [key: string]: Player };
  tickets: { [key: string]: Ticket };
  prizes: { [id: string]: Prize };
  gameEnv: GameEnv;
  city: string;
  state: string;
  country: string;
  createdTS: string;
  isFullGame: boolean;
  startTS: string;
  modifiedTS: string;
  endTS: string;
}

export const DEFAULT_GamePlay: GamePlayModel = {
  uid: '',
  gameConnectId: '',
  gameState: GameState.NOT_STARTED,
  gameMeta: null,
  board: {},
  lastFewNumbers: [],
  players: {},
  tickets: {},
  prizes: {},
  gameEnv: GameEnv.PubOrBar,
  city: '',
  state: '',
  country: '',
  isFullGame: false,
  createdTS: '',
  startTS: '',
  endTS: '',
  modifiedTS: ''
};
