import clsx from 'clsx';
import { getColorClass, getSizeClass } from './utils';
import { useState } from 'react';
import { Cross2Icon, CheckIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styleClasses?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'default' | 'sm' | 'lg' | null | undefined;
  testid?: string;
  children: React.ReactNode;
}

const ButtonWithConfirmation: React.FC<Props> = ({
  children,
  type = 'button',
  styleClasses = '',
  disabled = false,
  loading = false,
  size = 'default',
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
        <Button type='button' size={'sm'} onClick={() => setShowConfirm(false)}>
          <Cross2Icon />
        </Button>
        <Button type={type} size={'sm'} onClick={onClick}>
          <CheckIcon />
        </Button>
      </div>
    );
  }

  return (
    <Button
      {...props}
      data-testid={testid}
      className={clsx(styleClasses)}
      type={'button'}
      onClick={() => setShowConfirm(true)}
      disabled={disabled || loading}
      size={size}
    >
      {children}
    </Button>
  );
};

export default ButtonWithConfirmation;
