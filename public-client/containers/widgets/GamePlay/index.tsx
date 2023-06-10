'use client';

import { GamePlayModel } from '../../../data_models';
import { FC } from 'react';

import clsx from 'clsx';
import BingoBoard from '../../../containers/widgets/BingoBoard';
import LastCalledNumbers from '../../../containers/widgets/RecentCalledNumbers';
import PlayerList from '../../../containers/widgets/PlayerList';
import useGamePlay from './useGamePlay';
import GamePlayPrize from '../GamePlayPrize';
import TicketEvaluations from '../TicketEvaluation';
import GameControls from './GameControls';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

interface Props {
  gameID: string;
  gamePlay: GamePlayModel;
}

const GamePlay: FC<Props> = ({ gameID, gamePlay }) => {
  const {
    loading,
    gameState,
    board,
    lastNums,
    players,
    tickets,
    prizes,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    generateNextNumber,
    markEvaluationCorrect,
    rejectTicketEvaluation,
    approveRejectTicketRequest,
    fetchTicket,
    evalTicketNum
  } = useGamePlay(gameID, gamePlay);

  return (
    <div
      className={clsx(
        'grid',
        'grid-cols-1',
        'md:grid-cols-3',
        'gap-4',
        'md:gap-x-4',
        'lg:gap-x-8',
        'xl:gap-x-10'
      )}
    >
      <div className='grid gap-4 col-span-2'>
        <GameControls
          title={gamePlay.gameMeta?.title ?? ''}
          gameSate={gameState}
          players={players}
          startGame={startGame}
          resumeGame={resumeGame}
          pauseGame={pauseGame}
          endGame={endGame}
        />
        <div className={clsx('grid', 'grid-cols-1 md:grid-cols-3', 'gap-x-6')}>
          <div className='md:col-span-2'>
            <BingoBoard
              board={board}
              generateNextNumber={generateNextNumber}
              gameState={gameState}
            />
          </div>
          <div>
            {lastNums.length > 0 && <LastCalledNumbers recent={lastNums} />}
            <div className='mt-4 grid grid-cols-2 gap-x-4'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Rewards</Button>
                </SheetTrigger>
                <SheetContent position='bottom' size='content'>
                  <SheetHeader>
                    <SheetTitle>Rewards</SheetTitle>
                  </SheetHeader>
                  <GamePlayPrize
                    prizes={Object.values(prizes)}
                    players={players}
                  />
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type='button'>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Shoutouts</Button>
                </SheetTrigger>
                <SheetContent position='right' size='lg'>
                  <SheetHeader>
                    <SheetTitle>Shoutouts</SheetTitle>
                  </SheetHeader>
                  <TicketEvaluations
                    players={players}
                    prizes={gamePlay.prizes}
                    tickets={tickets}
                    fetchTicket={fetchTicket}
                    markEvalCorrect={markEvaluationCorrect}
                    markEvalInCorrect={rejectTicketEvaluation}
                    evalTicketNum={evalTicketNum}
                  />
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type='button'>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('md:col-span-1')}>
        <PlayerList
          approveRejectTicketRequestLoading={loading.approveRejectTicketRequest}
          gameID={gameID}
          connectorId={gamePlay.gameConnectId}
          approveRejectTicketRequest={approveRejectTicketRequest}
          players={players}
        />
      </div>
    </div>
  );
};

export default GamePlay;
