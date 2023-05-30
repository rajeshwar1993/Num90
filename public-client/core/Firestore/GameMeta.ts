import {
  gameMeta_ToDB,
  gameMeta_ToDBUpdate,
  gameMeta_fromDB
} from '../DataConverter/gameMeta';
import { db } from '../../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import * as Constants from '../../constants/fbConstants';
import { GameMetaKeys } from '../../constants/dbKeys';
import { GameMetaModel } from '../../data_models';
import { generate } from 'generate-password';

const gameMetaColRef = collection(db, Constants.GAMES_META_COLLECTION);

export const getGamesByCreatorId = async (createdBy: string) => {
  if (!createdBy) {
    throw Error('invalid argument');
  }

  const q = query(
    gameMetaColRef,
    where(GameMetaKeys.createdBy, '==', createdBy)
  );

  const querySnap = await getDocs(q);

  if (querySnap.empty) {
    return [];
  }

  let games: Array<GameMetaModel> = [];

  querySnap.forEach(snap => {
    games.push(gameMeta_fromDB(snap, {}));
  });

  return games;
};

export const getGameByUId = async (uid: string) => {
  if (!uid) {
    throw Error('invalid argument');
  }

  const docRef = doc(gameMetaColRef, uid);

  const snap = await getDoc(docRef);

  if (!snap.exists) {
    throw Error('no doc found');
  }

  return gameMeta_fromDB(snap, {});
};

export const getGameById = async (gameId: string) => {
  if (!gameId) {
    throw Error('invalid argument');
  }

  const q = query(gameMetaColRef, where(GameMetaKeys.gameId, '==', gameId));

  const querySnap = await getDocs(q);

  if (querySnap.empty || querySnap.size > 1) {
    throw Error('no doc found or multiple found');
  }

  const first = querySnap.docs[0];

  return gameMeta_fromDB(first, {});
};

export const createGameMeta = async (
  creatorId: string,
  gameMeta: GameMetaModel
) => {
  if (!creatorId || !gameMeta) {
    throw Error('invalid argument');
  }

  let gameId = '';
  let newGameIdFound = false;
  const exitAfterTries = 30;
  let tries = 0;

  while (!newGameIdFound && exitAfterTries > tries) {
    gameId = generate({
      numbers: true,
      lowercase: false,
      uppercase: true,
      length: 6
    });

    const q = query(gameMetaColRef, where(GameMetaKeys.gameId, '==', gameId));

    const docSnap = await getDocs(q);

    if (docSnap.empty) {
      newGameIdFound = true;
    }
    if (docSnap.size > 1) {
      throw Error('More than 1 game found');
    }

    tries++;
  }

  gameMeta.gameId = gameId;
  gameMeta.createdBy = creatorId;

  let gameRef = await addDoc(
    gameMetaColRef,
    gameMeta_ToDB({
      ...gameMeta,
      gameId,
      createdBy: creatorId
    })
  );

  if (!gameRef.id) {
    throw Error('error in writing doc');
  }

  gameMeta.uid = gameRef.id;

  return gameMeta;
};

export const updateGameMeta = async (
  gameId: string,
  gameMeta: GameMetaModel
) => {
  if (!gameId || !gameMeta) {
    throw Error('invalid argument');
  }

  let docRef = doc(gameMetaColRef, gameId);

  await updateDoc(docRef, gameMeta_ToDBUpdate(gameMeta));

  return true;
};

export const deleteGameMeta = async (gameId: string) => {
  if (!gameId) {
    throw Error('invalid argument');
  }

  let docRef = doc(gameMetaColRef, gameId);

  await deleteDoc(docRef);

  return true;
};
