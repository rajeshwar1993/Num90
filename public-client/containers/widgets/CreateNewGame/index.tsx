'use client';

import { FC, useState } from 'react';
import { Form, ModalDialog, SubHeading } from '../../../components';
import clsx from 'clsx';
import { DEFAULT, GameMetaModel } from '../../../data_models';
import { PlusIcon } from '@radix-ui/react-icons';
import { themeOptions } from '../GameMetaUI/themeOptions';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
        <Button className='hidden md:block' onClick={showCreateForm}>
          <div className='flex gap-x-1 items-center'>
            <PlusIcon />
            Create New Game
          </div>
        </Button>
        <Button className='block md:hidden' onClick={showCreateForm}>
          <PlusIcon width={25} height={25} />
        </Button>
      </div>
      <ModalDialog open={showForm} closeModal={hideCreateForm}>
        <Form submitHandlerFunc={onSubmit}>
          <div className='text-left'>
            <CardHeader className='space-y-1 pl-0'>
              <CardTitle className='text-2xl'>Create new game</CardTitle>
            </CardHeader>

            <div className='grid gap-2'>
              <Label htmlFor='email'>Game title</Label>
              <Input
                type='text'
                name='title'
                id='title'
                aria-label='Game Title'
                placeholder='Breakfast Bingo'
                className={clsx(
                  'py-2',
                  'text-3xl',
                  'lg:text-5xl',
                  'w-full',
                  'h-20'
                )}
              />
            </div>
          </div>

          <div className={clsx('flex', 'justify-between pt-4')}>
            <Button
              size='sm'
              type='button'
              variant={'outline'}
              onClick={hideCreateForm}
            >
              Cancel
            </Button>
            <Button size='sm' type='submit' color='accent'>
              Create
            </Button>
          </div>
        </Form>
      </ModalDialog>
    </>
  );
};

export default CreateNewGame;
