'use client';

import { FC, useState } from 'react';
import { Button, Form, ModalDialog, SubHeading } from '../../../components';
import clsx from 'clsx';
import { DEFAULT, GameMetaModel } from '../../../data_models';
import { PlusIcon } from '@radix-ui/react-icons';
import { themeOptions } from '../GameMetaUI/themeOptions';

interface Props {
  onCreate: (newGameMeta: GameMetaModel) => void;
}

const CreateNewGame: FC<Props> = ({ onCreate }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const showCreateForm = () => setShowForm(true);

  const hideCreateForm = () => setShowForm(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      title: { value: string };
    };

    const title = target.title.value;

    const newGameMeta: GameMetaModel = {
      ...DEFAULT.GameMeta,
      title,
      tagline: 'This game is brought to you by ...',
      theme: {
        pack: themeOptions[0],
        logo: null,
        bgImage: null
      }
    };

    onCreate(newGameMeta);
    hideCreateForm();
  };

  return (
    <>
      <div>
        <Button
          styleClasses='hidden md:block'
          color={'accent'}
          solid={true}
          onClick={showCreateForm}
        >
          <div className='flex gap-x-1 items-center'>
            <PlusIcon />
            Create New Game
          </div>
        </Button>
        <Button
          styleClasses='block md:hidden'
          color={'accent'}
          solid={true}
          onClick={showCreateForm}
          onlyIcon={true}
        >
          <PlusIcon width={25} height={25} />
        </Button>
      </div>
      <ModalDialog open={showForm} closeModal={hideCreateForm}>
        <div
          className={clsx('rounded-lg', 'p-4', 'lg:p-6', 'flex', 'flex-col')}
        >
          <Form submitHandlerFunc={onSubmit}>
            <div>
              <SubHeading styleClasses='mb-4'>Create New Game</SubHeading>
              <label htmlFor='title' className='font-semibold'>
                Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                aria-label='Game Title'
                placeholder='Breakfast Bingo'
                className={clsx(
                  'bg-transparent',
                  'py-2',
                  'text-3xl',
                  'lg:text-5xl',
                  'w-full',
                  'outline-none'
                )}
              />
            </div>
            <div
              className={clsx(
                'border-t',
                'border-skin-primary',
                'flex',
                'justify-between pt-4'
              )}
            >
              <Button size='sm' type='button' onClick={hideCreateForm}>
                Cancel
              </Button>
              <Button size='sm' type='submit' solid={true} color='accent'>
                Create
              </Button>
            </div>
          </Form>
        </div>
      </ModalDialog>
    </>
  );
};

export default CreateNewGame;
