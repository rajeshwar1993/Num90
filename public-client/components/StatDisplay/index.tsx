import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  title: string;
  value: string | number;
  trail?: string;
  styleClasses?: string;
  testid?: string;
}

const StatDisplay: FC<Props> = ({
  title,
  value,
  trail = '',
  styleClasses = '',
  testid = ''
}) => {
  return (
    <div
      data-testid={testid}
      className={clsx(
        'flex flex-col items-start w-fit py-1 rounded-lg ',
        styleClasses
      )}
    >
      <span className='lowercase text-xs font-medium block'>{title}</span>
      <span className='w-full text-lg font-semibold block py-1 border-t text-skin-accent'>
        {value}
      </span>
      {trail && <span className='lowercase text-xs font-light'>{trail}</span>}
    </div>
  );
};

export default StatDisplay;
