import { GameGlance } from 'models';
import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  selected: boolean;
  gameGlance: GameGlance;
}

const GameListGlance: FC<Props> = ({ gameGlance, selected }) => {
  return (
    <button
      className={clsx(
        'w-full',
        'py-2',
        'px-4',
        'text-left',
        'rounded-lg',
        'border',
        selected
          ? 'text-skin-accent border-skin-accent'
          : 'text-skin-primary border-skin-primary',
        'bg-skin-base',
        !selected &&
          'hover:bg-skin-accent hover:text-skin-inverted cursor-pointer',
        'transition',
        'duration-150',
        'ease-in-out',
        'flex',
        'flex-col'
      )}
      disabled={selected}
    >
      <span className={clsx('text-md', 'xl:text-lg')}>{gameGlance.title}</span>
      <span className='font-normal text-sm tracking-widest'>
        ({gameGlance.gameId})
      </span>
    </button>
  );
};

export default GameListGlance;
