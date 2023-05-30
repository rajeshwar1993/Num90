'use client';

import * as React from 'react';
import clsx from 'clsx';
// import Icon, { IconNames } from '../../Icons';
import { getColorClass, getSizeClass } from './utils';

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
  // icon?: IconNames | null;
  testid?: string;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
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
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <>{children}</>
    </button>
  );
};

export default Button;
