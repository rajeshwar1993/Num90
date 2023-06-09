import clsx from 'clsx';
import { BingoBoardCell } from '../../../data_models';
import { FC } from 'react';

interface Props {
  cell: BingoBoardCell;
}

const BoardCell: FC<Props> = ({ cell }) => {
  return (
    <div
      className={clsx(
        'text-xs',
        'md:text-base',
        '2xl:text-lg',
        'font-semibold',
        'w-6',
        'h-6',
        'md:w-8',
        'md:h-8',
        '2xl:w-12',
        '2xl:h-12',
        'flex',
        'justify-center',
        'items-center',

        cell.isCalled === false
          ? 'bg-primary text-primary-foreground rounded-lg'
          : 'bg-accent text-accent-foreground rounded-full'
      )}
    >
      {cell.num}
    </div>
  );
};

export default BoardCell;
