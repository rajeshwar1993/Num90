import React, { FC } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { ToastData } from '../../data_models';
import clsx from 'clsx';

type Props = {
  open: boolean;
  closeToast: () => void;
  toastData: ToastData | null;
};

const Toast: FC<Props> = ({ open, closeToast, toastData }) => {
  return (
    <RadixToast.Provider swipeDirection='right'>
      <RadixToast.Root
        className={clsx(
          'bg-skin-base',
          toastData?.type === 'error' ? 'text-skin-error' : 'text-skin-accent',
          'rounded-lg',
          'shadow-md',
          'p-2',
          'items-center',
          'data-[state=open]:animate-slideIn',
          'data-[state=closed]:animate-hide',
          'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
          'data-[swipe=cancel]:translate-x-0',
          'data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
          'data-[swipe=end]:animate-swipeOut'
        )}
        open={!!(open && toastData)}
      >
        <RadixToast.Title className='[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]'>
          {toastData?.title}
        </RadixToast.Title>
        <RadixToast.Description asChild>
          {toastData?.message}
        </RadixToast.Description>
        <RadixToast.Action
          className='[grid-area:_action]'
          asChild
          altText='Goto schedule to undo'
        >
          <button
            onClick={closeToast}
            className='inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8'
          >
            Close
          </button>
        </RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport className='[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none' />
    </RadixToast.Provider>
  );
};

export default Toast;
