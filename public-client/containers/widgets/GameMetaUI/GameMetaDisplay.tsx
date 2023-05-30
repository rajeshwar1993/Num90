import clsx from 'clsx';
import { GameMetaModel } from '../../../data_models';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { Button, Para, Pills, SubHeading, Table } from '../../../components';
import ThemeDisplay from '../GameTheme';

interface Props {
  gameMeta: GameMetaModel | null;
  setEditMode: () => void;
  createNewGamePlay: () => void;
}
const GameMetaDisplay: FC<Props> = ({
  gameMeta,
  setEditMode,
  createNewGamePlay
}) => {
  const tableData = useMemo(() => {
    const data = {
      headers: ['Description', 'Prize Item', '', 'Quantity'],
      rows: []
    };

    gameMeta.prizes.forEach(prize => {
      let row = {
        id: prize.id,
        mark: prize.quantity <= 0,
        cells: [prize.desc, prize.item, 'x', prize.quantity]
      };
      data.rows.push(row);
    });

    return data;
  }, [gameMeta.prizes]);

  return (
    <div className={clsx('grid', 'grid-cols-1', 'gap-6')}>
      {!gameMeta.isPremium && (
        <div className='flex items-center gap-x-4 text-skin-error font-semibold p-2 border rounded-lg border-skin-error'>
          <div className='text-6xl'>!</div>
          <div>
            <div>
              Your account is currently in Trial Mode. Max tickets allowed is 15
              per game.
            </div>
            <div>
              <Link href='/'>
                <span className='underline underline-offset-1'>Click here</span>
              </Link>{' '}
              to subcribe to Full Game Mode.
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-start lg:items-start gap-4'>
        <div>
          <span className='text-xs'>May 23rd. 2023</span>
          <div className='flex flex-col gap-y-2 items-start'>
            <h1 className='text-2xl lg:text-5xl font-semibold w-full max-w-[200px] md:max-w-2xl'>
              {gameMeta.title}
            </h1>
            <span className='text-md lg:text-xl font-semibold tracking-widest'>
              ({gameMeta.gameId})
            </span>
            <Para styleClasses='max-w-2xl'>{gameMeta.tagline}</Para>
          </div>
        </div>
        <Button solid={true} color='accent' onClick={setEditMode}>
          Edit Game
        </Button>
      </div>
      <div className='mt-6'>
        <div className='flex gap-x-4'>
          <SubHeading>Active Games</SubHeading>
          <Button solid={true} color='accent' onClick={createNewGamePlay}>
            Create New Game Play
          </Button>
        </div>
        {gameMeta.activeGames.length > 0 && (
          <ul className='list-disc list-inside ml-6'>
            {gameMeta.activeGames.map(ag => (
              <li key={ag} className='text-skin-accent font-semibold mt-2'>
                <Link href={`/game-play/${gameMeta.gameId}/${ag}`}>
                  <span className='tracking-widest hover:underline underline-offset-4'>
                    {ag}
                  </span>{' '}
                  {'(Click to open game)'}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {gameMeta.activeGames.length === 0 && <Para>No active gameplays.</Para>}
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4'>
        <div className='col-span-1'>
          <ThemeDisplay theme={gameMeta.theme} />
        </div>
        <div className='col-span-1'>
          <SubHeading styleClasses='mb-2'>Prizes</SubHeading>
          <Table tableData={tableData} />
          {tableData.rows.length === 0 && <Para>No prizes added yet.</Para>}
        </div>
      </div>
    </div>
  );
};

export default GameMetaDisplay;
