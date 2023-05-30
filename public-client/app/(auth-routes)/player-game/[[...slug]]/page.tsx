'use client';

import { useRouter } from 'next/navigation';
import PlayerGameScreen from '../../../../containers/widgets/PlayerGameScreen';
import useAuth from '../../../AuthProvider';
import { JOIN_GAME_PATH } from '../../../../constants/fbConstants';

export default function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];

  const [gameID, connectorID] = slug;
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();

  if (userLoading) {
    return <h1>Fetching user...</h1>;
  } else if (userLoading === false && user === null) {
    router.replace(JOIN_GAME_PATH(gameID, connectorID));
    return <></>;
  }

  return (
    <PlayerGameScreen user={user} gameID={gameID} connectorID={connectorID} />
  );
}
