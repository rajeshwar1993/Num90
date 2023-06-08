'use client';

import clsx from 'clsx';
import { FunctionResponse, GameMetaModel } from '../../../data_models';
import {
  CreateNewGame,
  GameList,
  GameMetaUI
} from '../../../containers/widgets';
import { Firestore } from '../../../core';
import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../AuthProvider';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../firebase';
import { FF_CREATE_GAMEPLAY } from '../../../constants/fbConstants';
import { useRouter } from 'next/navigation';
import Routes from '../../../constants/routes';
import { GameEnv } from '@/constants/enums';

export default function Page() {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();
  const [myGames, setMyGames] = useState<Array<GameMetaModel>>([]);
  const [selectedGame, setSelectedGame] = useState<GameMetaModel | null>(null);

  const createGame = async (newGameMetaModel: GameMetaModel) => {
    if (user === null) {
      // TODO - handle error
      return;
    }
    let updatedGameMeta = await Firestore.GameMeta.createGameMeta(
      user.uid,
      newGameMetaModel
    );

    setMyGames([updatedGameMeta, ...myGames]);
    setSelectedGame(updatedGameMeta);
  };
  const fetchMyGames = useCallback(async () => {
    if (user === null) {
      // TODO - handle error
      return;
    }
    const games = await Firestore.GameMeta.getGamesByCreatorId(user.uid);
    setMyGames(games);
    if (games.length) setSelectedGame(games[0]);
  }, [user]);

  const selectGame = (game: GameMetaModel) => {
    setSelectedGame(game);
  };

  const saveGame = async (updatedGame: GameMetaModel) => {
    let games = [...myGames];
    games = games.map(game =>
      game.uid === updatedGame.uid ? updatedGame : game
    );
    setMyGames(games);
    setSelectedGame(updatedGame);
    await Firestore.GameMeta.updateGameMeta(updatedGame.uid, updatedGame);
  };

  const createNewGamePlay = async (
    gameEnv: GameEnv,
    city: string,
    state: string,
    country: string,
    isFullGame: boolean
  ) => {
    if (user === null || selectedGame === null) {
      // TODO - handle error
      return;
    }
    //   // call firebase functo create game play
    const createGamelayFunc = httpsCallable<unknown, FunctionResponse>(
      functions,
      FF_CREATE_GAMEPLAY
    );
    let res = await createGamelayFunc({
      userId: user.uid,
      gameUID: selectedGame.uid,
      gameId: selectedGame.gameId,
      gameEnv,
      city,
      state,
      country,
      isFullGame
    });

    if (res.data.error) {
      // throw error
      return;
    }

    const gamePlayConnectorId = res.data.value;
    const gameMeta = { ...selectedGame };
    gameMeta.activeGames.unshift(gamePlayConnectorId);

    setSelectedGame(gameMeta);
    setMyGames(myGames =>
      myGames.map(myGame =>
        selectedGame.uid === myGame.uid ? gameMeta : myGame
      )
    );
  };

  useEffect(() => {
    if (user?.uid) fetchMyGames();
  }, [user?.uid, fetchMyGames]);

  if (userLoading) {
    return <h1>Fetching user...</h1>;
  } else if (userLoading === false && user === null) {
    router.replace(Routes.home);
    return <></>;
  }

  return (
    <div>
      <div
        className={clsx(
          'flex',
          'gap-8',
          'items-end',
          'flex-row',
          'justify-between',
          'lg:justify-start'
        )}
      >
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          My games
        </h1>
        <CreateNewGame onCreate={createGame} />
      </div>
      {selectedGame && (
        <div
          className={clsx(
            'lg:max-h-screen',
            'mt-10',
            'lg:mt-16',
            'grid',
            'grid-cols-1',
            'lg:grid-cols-5',
            'gap-x-16',
            'gap-y-10'
          )}
        >
          <div className={clsx('lg:col-span-1', 'pb-2', 'lg:pb-0')}>
            <GameList
              list={myGames}
              selectGame={selectGame}
              selectedGame={selectedGame}
            />
          </div>
          <div className='lg:col-span-4'>
            <GameMetaUI
              gameMeta={selectedGame}
              saveGame={saveGame}
              createNewGamePlay={createNewGamePlay}
            />
          </div>
        </div>
      )}
    </div>
  );
}
