import React, { FC } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  label: string;
  tooltip: string;
}

const Tooltip: FC<Props> = ({ label, tooltip }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <button
            className={clsx(
              'text-skin-accent',
              'font-semibold',
              'underline',
              'underline-offset-2'
            )}
          >
            {label}
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={clsx(
              'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
              'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
              'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
              'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
              'text-skin-primary',
              'select-none',
              'rounded-[4px]',
              'bg-skin-base',
              'px-[15px]',
              'py-[10px]',
              'text-[15px]',
              'leading-none',
              'shadow-lg',
              'will-change-[transform,opacity]'
            )}
            sideOffset={5}
          >
            {tooltip}
            <RadixTooltip.Arrow className='fill-white' />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
