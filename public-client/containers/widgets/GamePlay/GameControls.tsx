import { FC } from 'react';
import { GameState } from '../../../constants/enums';
import {
  Button,
  ButtonWithConfirmation,
  Heading,
  SubHeading
} from '../../../components';

interface Props {
  title: string;
  gameSate: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
}

const GameControls: FC<Props> = ({
  title,
  gameSate,
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
    <div className='grid grid-cols-2 gap-x-2 shadow-lg border rounded-lg p-4 border-skin-primary '>
      <Heading>{title}</Heading>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          size='sm'
          solid={true}
          color='accent'
          onClick={startGame}
          disabled={!isStartGameEnabled}
        >
          start
        </Button>
        <Button
          size='sm'
          solid={true}
          color='accent'
          onClick={pauseGame}
          disabled={!isPauseGameEnabled}
        >
          pause
        </Button>
        <Button
          size='sm'
          solid={true}
          color='accent'
          onClick={resumeGame}
          disabled={!isResumeGameEnabled}
        >
          resume
        </Button>
        <ButtonWithConfirmation
          size='sm'
          solid={true}
          color='accent'
          onClick={endGame}
          disabled={!isEndGameEnabled}
        >
          end
        </ButtonWithConfirmation>
      </div>
    </div>
  );
};

export default GameControls;
