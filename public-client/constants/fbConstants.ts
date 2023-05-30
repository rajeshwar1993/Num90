// DB collections
export const USER_COLLECTION = 'users';
export const GAMES_META_COLLECTION = 'gamesMeta';

// RDB collections
export const GAME_PLAY = 'game-plays';
export const GAME_PLAY_PATH = (gameId: string, connectorId: string) =>
  `${GAME_PLAY}/${gameId}/${connectorId}`;

export const JOIN_GAME = 'join-game';
export const JOIN_GAME_PATH = (gameId?: string, connectorId?: string) => {
  if (gameId && connectorId) return `${JOIN_GAME}/${gameId}/${connectorId}`;

  if (gameId) return `${JOIN_GAME}/${gameId}`;

  return JOIN_GAME;
};

export const PLAYER_GAME = 'player-game';
export const PLAYER_GAME_PATH = (gameId: string, connectorId: string) =>
  `${PLAYER_GAME}/${gameId}/${connectorId}`;
// FUNCTIONS
export const FF_CREATE_GAMEPLAY = 'createGameplayFF';
export const FF_APPROVE_REJECT_TICKET = 'approveRejectTicketRequestFF';
export const FF_JOIN_GAME_OR_FETCH_EXISTING = 'joinGameOrFetchExistingFF';
