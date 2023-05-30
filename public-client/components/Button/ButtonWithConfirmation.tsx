import clsx from 'clsx';
import { getColorClass, getSizeClass } from './utils';
import { useState } from 'react';
import Button from '.';
import { Cross2Icon, CheckIcon } from '@radix-ui/react-icons';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styleClasses?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'error';
  look?: 'button' | 'link';
  solid?: boolean;
  onlyIcon?: boolean;
  testid?: string;
  children: React.ReactNode;
}

const ButtonWithConfirmation: React.FC<Props> = ({
  children,
  type = 'button',
  styleClasses = '',
  disabled = false,
  loading = false,
  size = 'md',
  color = 'primary',
  look = 'button',
  solid = false,
  onlyIcon = false,
  // icon = null,
  testid = '',
  onClick = () => {},
  ...props
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className='grid grid-cols-2 gap-2 justify-items-center'>
        <span className='col-span-2'>Are you sure?</span>
        <Button
          type='button'
          onClick={() => setShowConfirm(false)}
          onlyIcon={true}
        >
          <Cross2Icon />
        </Button>
        <Button
          type={type}
          onClick={onClick}
          color='accent'
          solid={true}
          onlyIcon={true}
        >
          <CheckIcon />
        </Button>
      </div>
    );
  }

  return (
    <button
      {...props}
      data-testid={testid}
      className={clsx(
        'inline-block',
        'leading-tight',
        look === 'button' ? 'uppercase' : 'capitalize',
        look === 'button' ? 'font-medium' : 'font-semibold',
        'rounded-lg',
        'focus:outline-none',
        'focus:ring-0',
        look === 'button' && 'active:shadow-lg hover:shadow-lg focus:shadow-lg',
        'transition',
        'duration-150',
        'ease-in-out',
        'tracking-wide',
        getColorClass(color, solid, disabled || loading, look === 'link'),
        getSizeClass(size, onlyIcon, look === 'link'),
        styleClasses
      )}
      type={'button'}
      onClick={() => setShowConfirm(true)}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};

export default ButtonWithConfirmation;
