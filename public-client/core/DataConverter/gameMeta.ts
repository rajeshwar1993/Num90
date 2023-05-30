import { GameMetaModel } from '../../data_models';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore';
import { GameMetaKeys } from '../../constants/dbKeys';

export const gameMeta_ToDB = (gameMeta: GameMetaModel): DocumentData => {
  delete gameMeta.uid;

  return gameMeta;
};

export const gameMeta_ToDBUpdate = (gameMeta: GameMetaModel): DocumentData => {
  return {
    [GameMetaKeys.title]: gameMeta.title,
    [GameMetaKeys.tagline]: gameMeta.tagline,
    [GameMetaKeys.theme]: gameMeta.theme,
    [GameMetaKeys.isPremium]: gameMeta.isPremium,
    [GameMetaKeys.maxPlayers]: gameMeta.maxPlayers,
    [GameMetaKeys.accessTo]: gameMeta.accessTo,
    [GameMetaKeys.prizes]: gameMeta.prizes
  };
};

export const gameMeta_fromDB = (
  snapshot: QueryDocumentSnapshot,
  options: SnapshotOptions
): GameMetaModel => {
  const data = snapshot.data(options)!;

  data.uid = snapshot.id;

  return data as GameMetaModel;
};
