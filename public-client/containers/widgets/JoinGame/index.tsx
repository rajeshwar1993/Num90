import { GameMetaModel, UserModel } from '../../../data_models';
import { FC, useEffect, useMemo, useState } from 'react';
import { LoadingIcon, Para, SubHeading } from '../../../components';
import PhoneVerificationForm from '../PhoneNumberAuth';
import { Firestore } from '../../../core';
import PlayerGameConnectorForm from '../PlayerGameConnectorForm';
import useAuth from '../../../app/AuthProvider';
import PlayerDataForm from '../AuthForm/PlayerDataForm';
import QuickGameGlance from '../GameMetaUI/QuickGameGlance';

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

  const fetchGameData = async (gameId: string) => {
    setGame(g => ({ ...g, loading: true }));
    const res = await Firestore.GameMeta.getGameById(gameId);
    setGame({ data: res || null, loading: false });
  };

  useEffect(() => {
    if (gameId) {
      fetchGameData(gameId);
    }
  }, [gameId]);

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
          <SubHeading styleClasses='mb-4'>Let's join game</SubHeading>
          <PhoneVerificationForm />
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
    <div className='flex flex-col items-center text-left mx-auto max-w-xs mt-8'>
      {game.data && (
        <QuickGameGlance
          glance={{
            uid: game.data.uid,
            gameId: game.data.gameId,
            title: game.data.title,
            tagline: game.data.tagline,
            theme: game.data.theme
          }}
        />
      )}
      <div className='mt-16 flex flex-col items-center'>{toRender}</div>
    </div>
  );
};

export default JoinGame;
