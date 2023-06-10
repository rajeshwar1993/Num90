import clsx from 'clsx';
import { BingoBoardCell } from '../../../data_models';
import { FC } from 'react';
import { Pills } from '../../../components';

interface Props {
  recent: BingoBoardCell[];
}

const LastCalledNumbers: FC<Props> = ({ recent }) => {
  const top = recent[0];

  return (
    <div className='flex flex-col items-center gap-y-2'>
      <span>Last five numbers</span>
      <div>
        <Ball index={0} first={true} num={top.num} />
      </div>
      <div className='grid grid-cols-4 gap-x-4'>
        {recent.map((cell, i) =>
          i > 0 ? <Ball key={cell.num} index={i} num={cell.num} /> : <></>
        )}
      </div>
    </div>
  );
};

const Ball: FC<{ num: number; index: number; first?: boolean }> = ({
  num,
  index,
  first = false
}) => {
  return (
    <div
      className={clsx(
        'border',
        'flex justify-center items-center',
        'rounded-full',
        first
          ? 'text-3xl md:text-6xl p-4 h-20 w-20 md:h-40 md:w-40'
          : 'p-2 h-10 w-10',
        'bg-skin-accent',
        'text-skin-inverted'
      )}
    >
      {num}
    </div>
  );
};

export default LastCalledNumbers;
