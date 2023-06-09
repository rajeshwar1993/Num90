import clsx from 'clsx';
import { GameMetaModel } from '../../../data_models';
import { FC, useCallback, useMemo } from 'react';
import { Para, SubHeading, TableView } from '../../../components';
import ThemeDisplay from '../GameTheme';
import { Icons } from '@/components/icons';
import { GameEnv } from '@/constants/enums';
import { Card } from '@/components/ui/card';
import CreateNewGamePlay from './CreateNewGamePlay';
import { Button } from '@/components/ui/button';
import { TableRow } from '@/components/Table';

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
  loadingCreateGameplay: boolean;
}
const GameMetaDisplay: FC<Props> = ({
  gameMeta,
  setEditMode,
  createNewGamePlay,
  loadingCreateGameplay
}) => {
  const tableData = useMemo(() => {
    const data: { headers: string[]; rows: TableRow[] } = {
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

  const editGame = useCallback(() => {
    if (gameMeta.activeGames.length > 0) {
      // TODO - handle error - show it can't be edited
      throw Error('Cannot edit game.');
    }
    setEditMode();
  }, [gameMeta.activeGames]);

  return (
    <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-4', 'gap-6')}>
      <Card className='p-4 flex justify-between items-start lg:items-start gap-4 col-span-3'>
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
        <Button size={'sm'} onClick={editGame}>
          Edit Game
        </Button>
      </Card>
      <Card className='p-4 col-span-1'>
        <CreateNewGamePlay
          gameId={gameMeta.gameId}
          activeGames={gameMeta.activeGames}
          createNewGamePlay={createNewGamePlay}
          loadingCreateGameplay={loadingCreateGameplay}
        />
      </Card>

      <Card className='p-4 col-span-2'>
        <ThemeDisplay theme={gameMeta.theme} />
      </Card>
      <Card className='p-4 col-span-2'>
        <SubHeading styleClasses='mb-2'>Prizes</SubHeading>
        <TableView tableData={tableData} />
        {tableData.rows.length === 0 && <Para>No prizes added yet.</Para>}
      </Card>
    </div>
  );
};

export default GameMetaDisplay;
