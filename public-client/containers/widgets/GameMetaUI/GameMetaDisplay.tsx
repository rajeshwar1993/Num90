import clsx from 'clsx';
import { GameMetaModel } from '../../../data_models';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { Button, Para, SubHeading, TableView } from '../../../components';
import ThemeDisplay from '../GameTheme';
import { Icons } from '@/components/icons';
import { GameEnv } from '@/constants/enums';
import { Card } from '@/components/ui/card';
import CreateNewGamePlay from './CreateNewGamePlay';

interface Props {
  gameMeta: GameMetaModel;
  setEditMode: () => void;
  createNewGamePlay: (
    gameEnv: GameEnv,
    city: string,
    state: string,
    country: string,
    isFullGame: boolean
  ) => void;
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
        cells: [
          prize.desc,
          prize.item,
          <Icons.close key={prize.id} className='h-4 w-4' />,
          prize.quantity
        ]
      };
      data.rows.push(row);
    });

    return data;
  }, [gameMeta.prizes]);

  return (
    <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
      <Card className='p-4 flex justify-between items-start lg:items-start gap-4'>
        <div>
          <small className='text-xs'>May 23rd. 2023</small>
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
      </Card>
      <Card className='p-4'>
        <CreateNewGamePlay
          gameId={gameMeta.gameId}
          activeGames={gameMeta.activeGames}
          createNewGamePlay={createNewGamePlay}
        />
      </Card>

      <Card className='p-4 col-span-1'>
        <ThemeDisplay theme={gameMeta.theme} />
      </Card>
      <Card className='p-4 col-span-1'>
        <SubHeading styleClasses='mb-2'>Prizes</SubHeading>
        <TableView tableData={tableData} />
        {tableData.rows.length === 0 && <Para>No prizes added yet.</Para>}
      </Card>
    </div>
  );
};

export default GameMetaDisplay;
