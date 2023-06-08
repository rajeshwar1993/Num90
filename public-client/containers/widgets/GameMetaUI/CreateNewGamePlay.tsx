import { Form, ModalDialog, SubHeading } from '@/components';
import SimpleSelect from '@/components/SimpleSelect';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { GameEnv, GameEnvOpts } from '@/constants/enums';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
  gameId: string;
  activeGames: string[];
  createNewGamePlay: (
    gameEnv: GameEnv,
    city: string,
    state: string,
    country: string,
    isFullGame: boolean
  ) => void;
}

const CreateNewGamePlay: FC<Props> = ({
  gameId,
  activeGames,
  createNewGamePlay
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isFullGameFlag, setIsFullGameFlag] = useState<boolean>(false);

  const handleCreateGameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      gameEnv: { value: GameEnv };
      city: { value: string };
      state: { value: string };
      country: { value: string };
    };

    const gameEnv = target.gameEnv.value; // typechecks!
    const city = target.city.value; // typechecks!
    const state = target.state.value; // typechecks!
    const country = target.country.value; // typechecks!

    console.log(gameEnv, city, state, country, isFullGameFlag);
    createNewGamePlay(gameEnv, city, state, country, isFullGameFlag);
    setShowForm(false);
  };

  return (
    <>
      <div className='grid gap-4'>
        <SubHeading>Active Games</SubHeading>

        <Button onClick={() => setShowForm(true)}>Start Game</Button>

        {activeGames.length > 0 && (
          <ul className='list-disc list-inside ml-6'>
            {activeGames.map(ag => (
              <li key={ag} className='text-skin-accent font-semibold mt-2'>
                <Link href={`/game-play/${gameId}/${ag}`}>
                  <span className='tracking-widest hover:underline underline-offset-4'>
                    {ag}
                  </span>{' '}
                  {'(Click to open game)'}
                </Link>
                <Link href={`/game-display/${gameId}/${ag}`}>
                  <span className='block text-xs hover:underline underline-offset-2'>
                    open display screen
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {activeGames.length === 0 && (
          <blockquote className='border-l-2 pl-6 italic'>
            No active game.
          </blockquote>
        )}
      </div>

      <ModalDialog open={showForm} closeModal={() => setShowForm(false)}>
        <div className='text-left'>
          <Form submitHandlerFunc={handleCreateGameSubmit}>
            <CardHeader className='space-y-1 pl-0'>
              <CardTitle className='text-2xl'>Start a game</CardTitle>
            </CardHeader>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='gameEnv'>Where are we playing?</Label>
                <SimpleSelect
                  name='gameEnv'
                  options={GameEnvOpts}
                  defaultValue={GameEnvOpts[0].value}
                  label='Where are we playing?'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='city'>City</Label>
                <Input
                  required
                  type={'city'}
                  placeholder={'eg. Shillong'}
                  name={'city'}
                  id={'city'}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='state'>State</Label>
                <Input
                  required
                  type={'state'}
                  placeholder={'eg. Meghalaya'}
                  name={'state'}
                  id={'state'}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='country'>Country</Label>
                <Input
                  required
                  type={'country'}
                  placeholder={'eg. India'}
                  name={'country'}
                  id={'country'}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center space-x-2'>
                  <Label
                    htmlFor='isFullGame'
                    className={clsx(!isFullGameFlag && 'font-bold')}
                  >
                    Demo Game
                  </Label>
                  <Switch
                    id='isFullGame'
                    name='isFullGame'
                    defaultChecked={isFullGameFlag}
                    onCheckedChange={val => setIsFullGameFlag(val)}
                  />
                  <Label
                    htmlFor='isFullGame'
                    className={clsx(isFullGameFlag && 'font-bold')}
                  >
                    Full Game
                  </Label>
                </div>
                {!isFullGameFlag ? (
                  <small className='italic text-xs font-medium leading-none'>
                    Only 15 tickets can be generated for this game.
                  </small>
                ) : (
                  <small className='italic text-xs font-medium leading-none'>
                    Please purchase the as many tickets needed for this game.
                  </small>
                )}
              </div>
              <Button type='submit'>{`Let's play`}</Button>
            </div>
          </Form>
        </div>
      </ModalDialog>
    </>
  );
};

export default CreateNewGamePlay;
