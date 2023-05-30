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
import GameStats from './GameStats';

interface Props {
  gameID: string;
  gamePlay: GamePlayModel;
}

const GamePlay: FC<Props> = ({ gameID, gamePlay }) => {
  const {
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
        'md:grid-cols-2',
        'lg:grid-cols-5',
        'gap-4',
        'md:gap-x-6',
        'lg:gap-x-10',
        'xl:gap-x-16'
      )}
    >
      <div
        className={clsx(
          'md:col-span-2 lg:col-span-5',
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-5',
          'gap-4',
          'md:gap-x-6',
          'lg:gap-x-10',
          'xl:gap-x-16'
        )}
      >
        <div className='md:col-span-2'>
          <GameControls
            title={gamePlay.gameMeta?.title ?? ''}
            gameSate={gameState}
            startGame={startGame}
            resumeGame={resumeGame}
            pauseGame={pauseGame}
            endGame={endGame}
          />
        </div>
        <div className='md:col-span-3'>
          <GameStats players={players} />
        </div>
      </div>
      <div className={clsx('flex', 'flex-col', 'md:col-span-2')}>
        <BingoBoard
          board={board}
          generateNextNumber={generateNextNumber}
          gameState={gameState}
        />

        {lastNums.length > 0 && <LastCalledNumbers recent={lastNums} />}
      </div>
      <div className={clsx('md:col-span-2')}>
        <div className='min-h-[40%] pb-6 mb-6'>
          <GamePlayPrize prizes={Object.values(prizes)} players={players} />
        </div>
        <TicketEvaluations
          players={players}
          prizes={gamePlay.prizes}
          tickets={tickets}
          fetchTicket={fetchTicket}
          markEvalCorrect={markEvaluationCorrect}
          markEvalInCorrect={rejectTicketEvaluation}
          evalTicketNum={evalTicketNum}
        />
      </div>
      <div className={clsx('md:col-span-1')}>
        <PlayerList
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
