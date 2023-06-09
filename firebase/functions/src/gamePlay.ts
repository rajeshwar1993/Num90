import * as functions from 'firebase-functions';
import { getDatabase } from 'firebase-admin/database';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { generate } from 'generate-password';
import { v4 as uuidv4 } from 'uuid';
import {
  FunctionResponse,
  GAME_PLAY,
  GameMetaKeys,
  GamePlayHistoryModel,
  GamePlayKeys,
  GAMES_HISTORY_COLLECTION,
  GAMES_META_COLLECTION,
  GameState,
  Ticket
} from './helper';
import { getFreshBoard } from './helper';
import TambolaTicket from './helper/ticket-generator';

export const createGamePlay = async (
  data: {
    gameUID: string;
    gameId: string;
    userId: string;
    gameEnv: string;
    city: string;
    state: string;
    country: string;
    isFullGame: boolean;
  },
  context: functions.https.CallableContext
) => {
  const res: FunctionResponse = {
    value: null,
    error: false,
    message: null
  };

  let { gameUID, gameId, userId, gameEnv, city, state, country, isFullGame } =
    data;
  // check for userId and Game Id
  if (
    !gameUID ||
    !gameId ||
    !userId ||
    !gameEnv ||
    !city ||
    !state ||
    !country ||
    isFullGame === undefined
  ) {
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

  // check if the game exists
  const db = getFirestore();
  const gameMetaDoc = db.collection(GAMES_META_COLLECTION).doc(gameUID);

  const gameDoc = await gameMetaDoc.get();

  if (!gameDoc.exists) {
    res.error = true;
    res.message = 'Game does not exists.';
    return res;
  }

  const gameData = gameDoc.data();

  // create connectorId and check if already in use
  const rdb = getDatabase();

  let connectorId = '';
  let newConnectorFound = false;
  const exitAfterTries = 30;
  let tries = 0;

  while (!newConnectorFound && tries < exitAfterTries) {
    connectorId = generate({
      numbers: true,
      lowercase: false,
      uppercase: true,
      length: 5
    });

    const connectorColRef = rdb.ref(`${GAME_PLAY}/${gameId}/${connectorId}`);

    const docSnap = await connectorColRef.once('value');

    if (!docSnap.exists()) {
      newConnectorFound = true;
    }
    tries++;
  }

  if (tries === exitAfterTries) {
    res.error = true;
    res.message = 'Exited after all tries to create connector ID.';
    return res;
  }

  const gameSetRef = rdb.ref(`${GAME_PLAY}/${gameId}/${connectorId}`);

  const prizes: { [uid: string]: any } = {};

  if (gameData![GameMetaKeys.prizes])
    gameData![GameMetaKeys.prizes].forEach((prize: any) => {
      prizes[prize.id] = prize;
    });

  // create game structure in RDB with new gameID-playUID-connectorID
  const newGamePlay = {
    uid: uuidv4(),
    gameState: GameState.NOT_STARTED,
    gameConnectId: connectorId,
    gameMeta: {
      uid: gameDoc.id,
      title: gameData![GameMetaKeys.title],
      tagline: gameData![GameMetaKeys.tagline],
      theme: gameData![GameMetaKeys.theme],
      gameId: gameData![GameMetaKeys.gameId]
    },
    board: getFreshBoard(),
    lastFewNumbers: [],
    players: {},
    tickets: {},
    prizes,
    gameEnv,
    city,
    state,
    country,
    isFullGame,
    createdTS: '',
    startTS: '',
    modifiedTS: '',
    endTS: ''
  };

  await gameSetRef.set(newGamePlay);

  // register this new game in gameMeta collection

  await gameMetaDoc.update({
    [GameMetaKeys.activeGames]: FieldValue.arrayUnion(connectorId)
  });

  // return the new play ID
  res.value = connectorId;
  return res;
};

export const approveRejectTicketRequest = async (
  data: {
    gameUID: string;
    connectorId: string;
    gameId: string;
    userId: string;
    playerUid: string;
    noOfTickets: number;
    action: 'APPROVE' | 'REJECT';
  },
  context: functions.https.CallableContext
) => {
  const res: FunctionResponse = {
    value: null,
    error: false,
    message: null
  };

  let { gameUID, gameId, userId, playerUid, connectorId, noOfTickets, action } =
    data;
  // check for userId and Game Id
  if (!gameUID || !gameId || !userId || !connectorId || !playerUid) {
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

  const rdb = getDatabase();
  const playerRef = rdb.ref(
    `${GAME_PLAY}/${gameId}/${connectorId}/${GamePlayKeys.players}/${playerUid}`
  );

  if (action === 'REJECT') {
    // remove the request
    await playerRef.update({
      requestForTickets: null
    });

    res.value = true;
    return res;
  }

  // generate noOfTickets
  const newTickets: Ticket[] = [];

  for (let i = 0; i < noOfTickets; i++) {
    const tg = new TambolaTicket();
    tg.generate();
    const newTicketCells = tg.convertToCell();

    const ticketID = generate({
      numbers: true,
      lowercase: false,
      uppercase: true,
      length: 4
    });

    const newTicket: Ticket = {
      uid: uuidv4(),
      gameId: gameId,
      connectorId: connectorId,
      seqId: ticketID,
      cells: newTicketCells
    };
    newTickets.push(newTicket);
  }

  const ticketsRef = rdb.ref(
    `${GAME_PLAY}/${gameId}/${connectorId}/${GamePlayKeys.tickets}`
  );

  const playerTicketRef = rdb.ref(
    `${GAME_PLAY}/${gameId}/${connectorId}/${GamePlayKeys.players}/${playerUid}/ticketsIDs`
  );

  let updates: { [key: string]: any } = {};
  let playerTicketUpdates: { [key: string]: string } = {};
  // add tickets to DB
  newTickets.forEach(async ticket => {
    updates[ticket.uid] = ticket;
    playerTicketUpdates[ticket.uid] = ticket.seqId;
  });

  await ticketsRef.update(updates);
  await playerTicketRef.update(playerTicketUpdates);

  // remove ticket request
  await playerRef.update({
    requestForTickets: null
  });

  res.value = true;
  return res;
};

export const convertLiveGameToHistory = async (
  data: {
    gameUID: string;
    gameId: string;
    connectorId: string;
    userId: string;
  },
  context: functions.https.CallableContext
) => {
  const res: FunctionResponse = {
    value: null,
    error: false,
    message: null
  };

  let { gameUID, gameId, userId, connectorId } = data;
  // check for userId and Game Id
  if (!gameUID || !gameId || !userId || !connectorId) {
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

  // check if the gameID/connectorID exists in the RDB
  const rdb = getDatabase();
  const gameplayRef = rdb.ref(`${GAME_PLAY}/${gameId}/${connectorId}`);
  const docSnap = await gameplayRef.once('value');
  if (!docSnap.exists()) {
    res.error = true;
    res.message = 'Cannot find game.';
    return res;
  }

  // if exists, fetch all the data
  const gamePlayData = docSnap.val();

  // check if the same state is ended, if not stop processsing
  // TODO - use proper enums to check this
  if (gamePlayData['gameState'] !== 3) {
    res.error = true;
    res.message = 'Game has not ended yet';
    return res;
  }

  // convert the data into a game history object and save in firestore

  const players = gamePlayData['players']
    ? Object.keys(gamePlayData['players'])
    : [];
  const ticketCount = gamePlayData['tickets']
    ? Object.keys(gamePlayData['tickets']).length
    : 0;

  const gameHistory: GamePlayHistoryModel = {
    uid: gamePlayData['uid'],
    gameConnectId: gamePlayData['gameConnectId'],
    gameUID: gamePlayData['gameMeta']['uid'],
    players, // TODO
    ticketCount, // TODO
    prizes: gamePlayData['prizes'],
    gameEnv: gamePlayData['gameEnv'],
    city: gamePlayData['city'],
    state: gamePlayData['state'],
    country: gamePlayData['country'],
    createdTS: gamePlayData['createdTS'],
    isFullGame: gamePlayData['isFullGame'],
    startTS: gamePlayData['startTS'],
    endTS: gamePlayData['endTS']
  };

  const db = getFirestore();

  const gameHistoryDoc = db
    .collection(GAMES_HISTORY_COLLECTION)
    .doc(gameHistory.uid);

  await gameHistoryDoc.set({ ...gameHistory });

  // TODO add the played games (user to played games map) in a playedGames collection

  // ?future - have an insights collection that will generate insights for users, create

  // delete the live game from RDB
  await gameplayRef.remove();

  // remove from active games array in gamesMeta collection
  const gameMetaDoc = db.collection(GAMES_META_COLLECTION).doc(gameUID);

  await gameMetaDoc.update({
    activeGames: FieldValue.arrayRemove(connectorId)
  });

  res.value = true;
  return res;
};
