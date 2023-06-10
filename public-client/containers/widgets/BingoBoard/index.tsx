import { FC, useMemo, useState } from 'react';
import { BingoBoardCell } from '../../../data_models';
import clsx from 'clsx';
import BoardCell from './BoardCell';
import { SubHeading } from '../../../components';
import { GameState } from '../../../constants/enums';
import { Button } from '@/components/ui/button';

interface Props {
  gameState: GameState;
  board: { [key: number]: BingoBoardCell };
  generateNextNumber: () => void;
}

let timer: any;
let counter = 0;

const BingoBoard: FC<Props> = ({ gameState, board, generateNextNumber }) => {
  const [nextNumWaitCounter, setNextNumWaitCounter] = useState<number>(0);

  const gameStateMessage = useMemo(() => {
    if (gameState === GameState.NOT_STARTED) {
      return 'Game has not started yet.';
    } else if (gameState === GameState.PAUSED) {
      return 'Game has been paused.';
    } else if (gameState === GameState.EVAL) {
      return 'Tickets are being evaluated.';
    }
    return false;
  }, [gameState]);

  const handleNextNumberClick = () => {
    generateNextNumber();
    setNextNumWaitCounter(5);
    counter = 5;
    clearInterval(timer);

    timer = setInterval(() => {
      if (counter <= 0) {
        counter = 0;
        clearInterval(timer);
      }
      counter--;
      setNextNumWaitCounter(c => c - 1);
    }, 1000);
  };

  return (
    <div className='relative flex flex-col items-center justify-center p-1'>
      {gameStateMessage && (
        <div className='absolute text-primary w-full h-full bg-background/90 rounded-lg flex items-center justify-center'>
          <SubHeading>{gameStateMessage}</SubHeading>
        </div>
      )}
      <div className={clsx('grid', 'grid-cols-10', 'gap-2 2xl:gap-4', 'mb-4')}>
        {Object.values(board).map(cell => (
          <BoardCell key={cell.num} cell={cell} />
        ))}
      </div>
      <Button
        className='w-full'
        onClick={handleNextNumberClick}
        disabled={!!gameStateMessage || nextNumWaitCounter > 0}
      >
        {nextNumWaitCounter > 0
          ? `Waiting for ... ${nextNumWaitCounter}`
          : 'Generate Next Number'}
      </Button>
    </div>
  );
};

export default BingoBoard;
