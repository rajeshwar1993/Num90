import * as functions from 'firebase-functions';
import { getDatabase } from 'firebase-admin/database';
import { FunctionResponse, GAME_PLAY, GamePlayKeys } from './helper';
import { generate } from 'generate-password';

export const joinGameOrFetchExistingPlayer = async (
  data: {
    gameId: string;
    connectorId: string;
    userId: string;
    userName: string;
  },
  context: functions.https.CallableContext
) => {
  const res: FunctionResponse = {
    value: null,
    error: false,
    message: null
  };

  let { gameId, userId, connectorId, userName } = data;
  // check for userId and Game Id
  if (!gameId || !userId || !connectorId) {
    res.error = true;
    res.message = 'Invalid arguments';
    return res;
  }

  // check for proper auth
  if (context.auth === undefined || context.auth.uid !== userId) {
    res.error = true;
    res.message = 'Incorrect user.';
    return res;
  }

  // check connectorId and gameplay
  const rdb = getDatabase();

  const thisPlayerRef = rdb.ref(
    `${GAME_PLAY}/${gameId}/${connectorId}/${GamePlayKeys.players}/${userId}`
  );
  const docSnap = await thisPlayerRef.once('value');

  // if the player is already part of the game, return that - else continue to create new player
  if (docSnap.exists()) {
    res.value = docSnap.val();
    return res;
  }

  const playersRef = rdb.ref(
    `${GAME_PLAY}/${gameId}/${connectorId}/${GamePlayKeys.players}/`
  );

  const playerId = generate({
    numbers: true,
    lowercase: false,
    uppercase: true,
    length: 5
  });

  let newPlayer = {
    uid: userId,
    name: userName,
    gameId: gameId,
    playerId: `PL-${playerId}`,
    raiseForEvaluation: false,
    requestForTickets: null,
    evalDetails: null,
    ticketsIDs: {},
    ticketCount: 0
  };

  await playersRef.update({
    [userId]: newPlayer
  });

  res.value = newPlayer;

  return res;
};
