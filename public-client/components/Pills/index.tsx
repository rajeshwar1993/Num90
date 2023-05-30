import clsx from 'clsx';
import { FC } from 'react';
// import Icon, { IconNames } from '../../Icon';
// import IconButton from '../Button/IconButton';

interface Props {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'error';
  onClick?: () => void;
}

const Pills: FC<Props> = ({
  onClick,
  text,
  size = 'sm',
  color = 'secondary'
}) => {
  let styles = clsx(
    'rounded-xs',
    'min-w-[70px]',
    'text-center',
    'font-bold',
    'border-2'
  );

  switch (color) {
    case 'primary':
      styles = clsx(styles, 'border-skin-primary', 'text-skin-primary');
      break;

    case 'accent':
      styles = clsx(styles, 'border-skin-accent', 'text-skin-accent');
      break;

    case 'error':
      styles = clsx(styles, 'border-skin-error', 'text-skin-error');
      break;
  }

  switch (size) {
    case 'sm':
      styles = clsx(styles, 'px-1.5', 'py-0.5', 'text-xs');
      break;

    case 'md':
      styles = clsx(styles, 'px-1.5', 'py-0.5', 'text-xs');
      break;

    case 'lg':
      styles = clsx(styles, 'px-2', 'py-1', 'text-sm');
      break;
  }

  return (
    <div
      className={clsx(
        styles,
        'flex',
        'items-center',
        'gap-x-2',
        onClick ? 'justify-between' : 'justify-center'
      )}
    >
      <span>{text}</span>
      {/* {onClick && (
        <button onClick={onClick} className='p-1'>
          <Icon name={IconNames.Close} size='12' />
        </button>
      )} */}
    </div>
  );
};

export default Pills;
