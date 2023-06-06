import { GameGlance } from '../../data_models';
import { FC } from 'react';
import clsx from 'clsx';
import { Card } from '../ui/card';

interface Props {
  selected: boolean;
  gameGlance: GameGlance;
  onClick: () => void;
}

const GameListGlance: FC<Props> = ({ gameGlance, selected, onClick }) => {
  return (
    <Card
      className={clsx(
        'w-full',
        'my-2',
        'py-2',
        'px-4',
        'text-left',
        selected && 'text-accent border-accent',
        !selected &&
          'hover:bg-accent hover:text-accent-foreground cursor-pointer',
        'transition',
        'duration-150',
        'ease-in-out',
        'flex',
        'flex-col'
      )}
      onClick={!selected ? onClick : () => {}}
    >
      <span className={clsx('text-md', 'xl:text-lg')}>{gameGlance.title}</span>
      <span className='font-normal text-sm tracking-widest'>
        ({gameGlance.gameId})
      </span>
    </Card>
  );
};

export default GameListGlance;
