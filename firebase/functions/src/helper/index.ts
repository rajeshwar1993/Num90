export const getFreshBoard = () => {
  const board: { [key: string]: { num: number; isCalled: boolean } } = {};

  for (let i = 1; i <= 90; i++) {
    board[`${i}`] = { num: i, isCalled: false };
  }

  return board;
};

export interface FunctionResponse {
  value: any;
  error: boolean;
  message: string | null;
}

export const GAME_PLAY = 'game-plays';
export const GAMES_META_COLLECTION = 'gamesMeta';
export enum GameState {
  NOT_STARTED,
  STARTED,
  PAUSED,
  ENDED
}

export const GameMetaKeys = {
  uid: 'uid',
  title: 'title',
  tagline: 'tagline',
  theme: 'theme',
  gameId: 'gameId',
  activeGames: 'activeGames',
  isPremium: 'isPremium',
  createdBy: 'createdBy',
  maxPlayers: 'maxPlayers',
  accessTo: 'accessTo',
  prizes: 'prizes',
  deletion: 'deletion',
  deletionTS: 'deletionTS',
  createdTS: 'createdTS'
};

export interface Player {
  uid: string;
  name: string;
  playerId: string;
  gameId: string;
  raiseForEvaluation: boolean;
  requestForTickets: number | null;
  evalDetails: null | {
    ticketID: string;
    prizeID: string;
  };
  ticketCount: number;
  ticketsIDs: { [uid: string]: string };
}

export interface TicketCell {
  num: number | null;
  eval: boolean | null;
  isMarked: boolean;
}

export interface Cells {
  [key: number]: {
    [key: number]: TicketCell;
  };
}

export interface Ticket {
  uid: string;
  seqId: string;
  gameId: string;
  connectorId: string;
  // num should hold 0 if the value is empty
  cells: Cells;
}

export const GamePlayKeys = {
  uid: 'uid',
  gameState: 'gameState',
  gameConnectId: 'gameConnectId',
  gameMeta: 'gameMeta',
  board: 'board',
  lastFewNumbers: 'lastFewNumbers',
  players: 'players',
  tickets: 'tickets',
  createdTS: 'createdTS',
  startTS: 'startTS',
  modifiedTS: 'modifiedTS',
  endTS: 'endTS'
};
