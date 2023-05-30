import React, { FC } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { Image } from '../../../data_models';

interface Props {
  image?: Image;
  name?: string;
  isOnProfileScreen?: boolean;
}

const AvatarComp: FC<Props> = ({
  image = null,
  name = 'U',
  isOnProfileScreen = false
}) => (
  <Avatar.Root
    className={clsx(
      'bg-skin-primary',
      'inline-flex',
      isOnProfileScreen ? 'h-[270px] w-[270px]' : 'h-[30px] w-[30px]',
      isOnProfileScreen ? 'md:h-[280px] w-[280px]' : 'md:h-[45px] w-[45px]',
      'select-none',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded-lg',
      'align-middle',
      'border',
      'border-skin-primary'
    )}
  >
    <Avatar.Image
      className='h-full w-full rounded-[inherit] object-cover'
      src={image ? image.src : null}
      alt='User'
    />
    <Avatar.Fallback
      className={clsx(
        'leading-1',
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
        'bg-skin-accent',
        'text-skin-inverted',
        isOnProfileScreen ? 'text-9xl' : 'text-lg',
        'font-medium'
      )}
      delayMs={600}
    >
      {name ? name[0].toLocaleUpperCase() : 'U'}
    </Avatar.Fallback>
  </Avatar.Root>
);

export default AvatarComp;
