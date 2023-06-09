import { UserModel } from '../../../data_models';
import { FC, useMemo } from 'react';
import usePlayerActions from './usePlayerActions';
import { LoadingIcon, Para, SubHeading } from '../../../components';
import Link from 'next/link';
import Routes from '../../../constants/routes';
import PlayArea from './PlayArea';
import QuickGameGlance from '../GameMetaUI/QuickGameGlance';
import { GameState } from '../../../constants/enums';
import { Button } from '@/components/ui/button';

interface Props {
  gameID: string;
  connectorID: string;
  user: UserModel;
}

const PlayerGameScreen: FC<Props> = ({ gameID, connectorID, user }) => {
  const {
    gameState,
    gameJoinStatus,
    gameDetails,
    player,
    prizes,
    tickets,
    joinOrFetchGamePlayer,
    requestForTickets,
    markTicketNum,
    raiseForEvaluation
  } = usePlayerActions(gameID, connectorID, user);

  const toRender = useMemo(() => {
    if (gameState === GameState.ENDED) {
      return (
        <Link href={Routes.home}>
          <Button>Got to Home</Button>
        </Link>
      );
    }

    if (gameJoinStatus === 'SEARCHING') {
      return (
        <div className='flex gap-x-4 items-center'>
          <SubHeading>Verifying game details ...</SubHeading>
          <LoadingIcon />
        </div>
      );
    } else if (gameJoinStatus === 'NOT_FOUND') {
      return (
        <div>
          <SubHeading>Game not found</SubHeading>
          <Para styleClasses='underline text-skin-accent'>
            <Link href={Routes.joinGame}>Click here to join again</Link>
          </Para>
        </div>
      );
    } else if (gameJoinStatus === 'FOUND' && gameDetails != null) {
      return (
        <div className='flex flex-col gap-y-2 items-center'>
          <QuickGameGlance
            glance={{
              uid: gameDetails.uid,
              gameId: gameDetails.gameId,
              title: gameDetails.title,
              tagline: gameDetails.tagline,
              theme: gameDetails.theme
            }}
          />
          <Button onClick={joinOrFetchGamePlayer}>Join Game</Button>
        </div>
      );
    } else if (player !== null) {
      return (
        <PlayArea
          ticketsRequested={player.requestForTickets}
          requestForTickets={requestForTickets}
          tickets={tickets}
          prizes={prizes}
          markTicketNum={markTicketNum}
          raiseForEvaluation={raiseForEvaluation}
        />
      );
    }
  }, [gameJoinStatus, player, tickets, prizes]);

  const topBar = useMemo(() => {
    let messageToShow = (
      <span className='font-semibold text-red-600'>Game has not started</span>
    );
    switch (gameState) {
      case GameState.NOT_STARTED:
        messageToShow = (
          <span className='font-semibold text-red-600'>
            Game Has Not Started
          </span>
        );
        break;

      case GameState.STARTED:
        messageToShow = (
          <span className='font-semibold text-green-600'>{`All the best! Let's play.`}</span>
        );
        break;

      case GameState.PAUSED:
        messageToShow = (
          <span className='font-semibold text-red-600'>
            Game has been paused.
          </span>
        );
        break;

      case GameState.EVAL:
        messageToShow = (
          <span className='font-semibold text-red-600'>
            Tickets are being checked.
          </span>
        );
        break;

      case GameState.ENDED:
        messageToShow = (
          <span className='font-semibold text-red-600'>Game has ended.</span>
        );
        break;
    }

    return (
      <div className='sticky top-0 py-4 bg-skin-base'>
        <div className='flex justify-between items-center border-b border-skin-primary text-xs'>
          {gameDetails && (
            <div>
              GameId:{' '}
              <span className='font-bold tracking-widest text-skin-accent'>
                {gameDetails.gameId}
              </span>
            </div>
          )}
          {player?.playerId && (
            <div>
              {player.name}:
              <span className='font-bold tracking-widest text-skin-accent'>
                {' '}
                {player.playerId}
              </span>
            </div>
          )}
        </div>
        <div className='flex justify-center items-center border-b border-skin-primary'>
          {messageToShow}
        </div>
      </div>
    );
  }, [player, gameDetails, gameState]);

  return (
    <div className='max-h-full'>
      {topBar}
      <div className='min-h-[500px] max-h-full flex flex-col justify-center items-center'>
        {toRender}
      </div>
    </div>
  );
};

export default PlayerGameScreen;
