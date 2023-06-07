import { GameMetaModel, UserModel } from '../../../data_models';
import { FC, useEffect, useMemo, useState } from 'react';
import { LoadingIcon, Para, SubHeading } from '../../../components';
import PhoneVerificationForm from '../PhoneNumberAuth';
import { Firestore } from '../../../core';
import PlayerGameConnectorForm from '../PlayerGameConnectorForm';
import useAuth from '../../../app/AuthProvider';
import PlayerDataForm from '../AuthForm/PlayerDataForm';
import QuickGameGlance from '../GameMetaUI/QuickGameGlance';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  gameId?: string;
  connectorId?: string;
}

const JoinGame: FC<Props> = ({ gameId, connectorId }) => {
  const { user, loading: userLoading, savePlayerData } = useAuth();
  const [game, setGame] = useState<{
    loading: boolean;
    data: GameMetaModel | null;
  }>({
    loading: false,
    data: null
  });

  // const fetchGameData = async (gameId: string) => {
  //   setGame(g => ({ ...g, loading: true }));
  //   const res = await Firestore.GameMeta.getGameById(gameId);
  //   setGame({ data: res || null, loading: false });
  // };

  // useEffect(() => {
  //   if (gameId) {
  //     fetchGameData(gameId);
  //   }
  // }, [gameId]);

  const toRender = useMemo(() => {
    if (userLoading) {
      return (
        <div className='flex items-end gap-x-2'>
          <span className='font-semibold'>Checing User and Game Info ... </span>

          <LoadingIcon />
        </div>
      );
    } else if (!userLoading && user === null) {
      return (
        <>
          <PhoneVerificationForm title={`Let's join the game`} />
        </>
      );
    } else if (user && !user.name) {
      return <PlayerDataForm onSave={savePlayerData} />;
    } else {
      return (
        <PlayerGameConnectorForm gameID={gameId} connectorID={connectorId} />
      );
    }
  }, [userLoading, user, gameId, connectorId, game]);

  return (
    <div className='flex flex-col justify-center items-center text-left mx-auto max-w-xs h-full'>
      <Card className='p-4 w-full mb-28'>{toRender}</Card>
    </div>
  );
};

export default JoinGame;
