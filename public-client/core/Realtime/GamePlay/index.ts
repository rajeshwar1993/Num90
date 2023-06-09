import { child, get, ref, serverTimestamp, update } from 'firebase/database';
import { GAME_PLAY_PATH } from '../../../constants/fbConstants';
import { GamePlayKeys } from '../../../constants/dbKeys';
import { GameState } from '../../../constants/enums';
import { rdb } from '../../../firebase';
import { BingoBoardCell, GamePlayModel } from '../../../data_models';

export const checkGameExists = async (
  gamePlayId: string,
  connectorId: string
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);
  const snap = await get(ref(rdb, initialPath));

  if (!snap.exists()) {
    return false;
  }

  return snap.val()['gameMeta'];
};

export const fetchGame = async (gamePlayId: string, connectorId: string) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);
  const snap = await get(ref(rdb, initialPath));

  if (!snap.exists) {
    return null;
  }

  const data = snap.val();

  const gp: GamePlayModel = {
    uid: data.uid,
    startTS: data.startTS,
    endTS: data.endTS,
    gameConnectId: data.gameConnectId,
    gameState: data.gameState,
    modifiedTS: data.modifiedTS,
    board: data.board,
    createdTS: data.createdTS,
    lastFewNumbers: data.lastFewNumbers || [],
    players: data.players || {},
    gameEnv: data.gameEnv,
    city: data.city || '',
    state: data.state || '',
    country: data.country || '',
    isFullGame: data.isFullGame,
    tickets: data.ticket || {},
    prizes: data.prizes || [],
    gameMeta: data.gameMeta
  };

  return gp;
};

export const startGame = async (gamePlayId: string, connectorId: string) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};
  updates[`${initialPath}/${GamePlayKeys.gameState}`] = GameState.STARTED;
  updates[`${initialPath}/${GamePlayKeys.startTS}`] = serverTimestamp();
  updates[`${initialPath}/${GamePlayKeys.modifiedTS}`] = serverTimestamp();

  await update(ref(rdb), updates);

  return true;
};

export const pauseGame = async (gamePlayId: string, connectorId: string) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};
  updates[`${initialPath}/${GamePlayKeys.gameState}`] = GameState.PAUSED;
  updates[`${initialPath}/${GamePlayKeys.modifiedTS}`] = serverTimestamp();

  await update(ref(rdb), updates);

  return true;
};

export const resumeGame = async (gamePlayId: string, connectorId: string) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};
  updates[`${initialPath}/${GamePlayKeys.gameState}`] = GameState.STARTED;
  updates[`${initialPath}/${GamePlayKeys.modifiedTS}`] = serverTimestamp();

  await update(ref(rdb), updates);

  return true;
};

export const endGame = async (gamePlayId: string, connectorId: string) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};
  updates[`${initialPath}/${GamePlayKeys.gameState}`] = GameState.ENDED;
  updates[`${initialPath}/${GamePlayKeys.modifiedTS}`] = serverTimestamp();
  updates[`${initialPath}/${GamePlayKeys.endTS}`] = serverTimestamp();

  await update(ref(rdb), updates);

  return true;
};

export const generateNextNumber = async (
  gamePlayId: string,
  connectorId: string,
  nextNumber: number,
  lastFewNumbers: BingoBoardCell[]
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};
  updates[`${initialPath}/${GamePlayKeys.board}/${nextNumber}/isCalled`] = true;
  updates[`${initialPath}/${GamePlayKeys.lastFewNumbers}`] = lastFewNumbers;
  updates[`${initialPath}/${GamePlayKeys.modifiedTS}`] = serverTimestamp();

  await update(ref(rdb), updates);

  return true;
};

export const requestForTickets = async (
  gamePlayId: string,
  connectorId: string,
  playerUid: string,
  noOfTickets: number
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/requestForTickets/`
  ] = noOfTickets;

  await update(ref(rdb), updates);

  return true;
};

export const markTicketNum = async (
  gamePlayId: string,
  connectorId: string,
  ticketId: string,
  row: number,
  col: number,
  mark: boolean
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  updates[`${initialPath}/tickets/${ticketId}/cells/${row}/${col}/isMarked`] =
    mark;

  await update(ref(rdb), updates);

  return true;
};

export const evalTicketNum = async (
  gamePlayId: string,
  connectorId: string,
  ticketId: string,
  row: number,
  col: number,
  mark: boolean
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  updates[`${initialPath}/tickets/${ticketId}/cells/${row}/${col}/eval`] = mark;

  await update(ref(rdb), updates);

  return true;
};

export const raiseForEvaluation = async (
  gamePlayId: string,
  connectorId: string,
  playerUid: string,
  ticketId: string,
  prizeId: string
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  updates[`${initialPath}/${GamePlayKeys.gameState}`] = GameState.EVAL;

  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/raiseForEvaluation`
  ] = true;

  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/evalDetails/ticketID`
  ] = ticketId;

  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/evalDetails/prizeID`
  ] = prizeId;

  await update(ref(rdb), updates);

  return true;
};

export const markEvaluationCorrect = async (
  gamePlayId: string,
  connectorId: string,
  playerUid: string,
  playerID: string,
  ticketSeqId: string,
  prizeId: string,
  previousPrizeCount: number
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  // removing flag for evaluation
  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/raiseForEvaluation`
  ] = false;

  // removing player eval details
  updates[`${initialPath}/${GamePlayKeys.players}/${playerUid}/evalDetails`] =
    null;

  // updating winning player id in prize
  updates[
    `${initialPath}/${GamePlayKeys.prizes}/${prizeId}/winnerPlayerId/${playerUid}`
  ] = ticketSeqId;

  // updating winning player id in prize
  updates[`${initialPath}/${GamePlayKeys.prizes}/${prizeId}/quantity`] =
    previousPrizeCount - 1;

  await update(ref(rdb), updates);

  return true;
};

export const markEvaluationInCorrect = async (
  gamePlayId: string,
  connectorId: string,
  playerUid: string
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const updates: { [key: string]: any } = {};

  // removing flag for evaluation
  updates[
    `${initialPath}/${GamePlayKeys.players}/${playerUid}/raiseForEvaluation`
  ] = false;

  // removing player eval details
  updates[`${initialPath}/${GamePlayKeys.players}/${playerUid}/evalDetails`] =
    null;

  await update(ref(rdb), updates);

  return true;
};

export const fetchTicket = async (
  gamePlayId: string,
  connectorId: string,
  ticketId: string
) => {
  const initialPath = GAME_PLAY_PATH(gamePlayId, connectorId);

  const res = await get(
    child(ref(rdb), initialPath + `/${GamePlayKeys.tickets}/${ticketId}`)
  );

  return res.val();
};
