'use client';

import { GamePlayModel } from '../../../../../data_models';
import GamePlay from '../../../../../containers/widgets/GamePlay';
import { FC, useEffect, useState } from 'react';
import { Realtime } from '../../../../../core';
import useAuth from '../../../../AuthProvider';
import { useRouter } from 'next/navigation';
import Routes from '../../../../../constants/routes';

const Page: FC<{ params: { connectorID: string; gameID: string } }> = ({
  params
}) => {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [gamePlay, setGamePlay] = useState<GamePlayModel | null>(null);

  const fetchGamePlay = async (gameID: string, connectorID: string) => {
    setLoading(true);
    const data = await Realtime.GamePlay.fetchGame(gameID, connectorID);
    setGamePlay(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGamePlay(params.gameID, params.connectorID);
  }, [params]);

  if (userLoading) {
    return <h1>Fetching user...</h1>;
  } else if (userLoading === false && user === null) {
    router.replace(Routes.home);
    return <></>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!loading && gamePlay === null) {
    return <h1>No Game found...</h1>;
  }

  return <GamePlay gameID={params.gameID} gamePlay={gamePlay} />;
};

export default Page;
