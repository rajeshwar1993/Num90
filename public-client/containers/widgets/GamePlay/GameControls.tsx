import { FC, useState } from 'react';
import { GameState } from '../../../constants/enums';
import {
  ButtonWithConfirmation,
  LoadingIcon,
  ModalDialog
} from '../../../components';
import { Button } from '@/components/ui/button';
import GameStats from './GameStats';
import { Player } from '@/data_models';

interface Props {
  title: string;
  gameSate: GameState;
  players: { [key: string]: Player };
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
}

const GameControls: FC<Props> = ({
  title,
  gameSate,
  players,
  startGame,
  pauseGame,
  resumeGame,
  endGame
}) => {
  const isStartGameEnabled = gameSate === GameState.NOT_STARTED;

  const isPauseGameEnabled = gameSate === GameState.STARTED;

  const isResumeGameEnabled =
    gameSate === GameState.PAUSED || gameSate === GameState.EVAL;

  const isEndGameEnabled =
    gameSate === GameState.STARTED ||
    gameSate === GameState.PAUSED ||
    gameSate === GameState.EVAL;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg border rounded-lg p-4 border-skin-primary'>
        <h1 className='col-span-1 text-2xl md:text-3xl xl:text-4xl font-semibold line-clamp-2'>
          {title}
        </h1>
        <div className='grid grid-cols-2 gap-2 '>
          <Button size='sm' onClick={startGame} disabled={!isStartGameEnabled}>
            start
          </Button>
          <Button size='sm' onClick={pauseGame} disabled={!isPauseGameEnabled}>
            pause
          </Button>
          <Button
            size='sm'
            onClick={resumeGame}
            disabled={!isResumeGameEnabled}
          >
            resume
          </Button>
          <ButtonWithConfirmation
            size='sm'
            onClick={endGame}
            disabled={!isEndGameEnabled}
          >
            end
          </ButtonWithConfirmation>
        </div>
        <div>
          <GameStats players={players} />
        </div>
      </div>
      <ModalDialog open={gameSate === GameState.ENDED} closeModal={() => {}}>
        <div className='flex items-end gap-x-2'>
          <span className='font-semibold'>Saving game play ... </span>
          <LoadingIcon />
        </div>
      </ModalDialog>
    </>
  );
};

export default GameControls;
