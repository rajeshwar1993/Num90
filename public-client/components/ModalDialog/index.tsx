'use client';

import React, { Fragment, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Button from '../Button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Card, CardContent } from '../ui/card';

interface Props {
  open: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}

const ModalDialog: FC<Props> = ({ open, closeModal, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-background/70' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx('transition-all', 'transform', 'shadow-xl')}
              >
                <Card
                  className={clsx(
                    'relative',
                    'inline-block',
                    'max-w-sm',
                    'min-w-[356px]',
                    'md:max-w-xl',
                    'md:min-w-[400px]',
                    'lg:max-w-3xl',
                    'xl:max-w-5xl',
                    'align-middle'
                  )}
                >
                  <Button
                    onClick={closeModal}
                    styleClasses='absolute right-2 top-2'
                    onlyIcon={true}
                  >
                    <Cross2Icon />
                  </Button>
                  <CardContent>{children}</CardContent>
                </Card>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalDialog;
