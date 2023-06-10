import { Player, Prize } from '../../../data_models';
import { FC, useMemo } from 'react';
import { SubHeading, TableView } from '../../../components';
import { TableRow } from '@/components/Table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface Props {
  prizes: Prize[];
  players: { [key: string]: Player };
}

const GamePlayPrize: FC<Props> = ({ prizes, players }) => {
  const tableData = useMemo(() => {
    const data: { headers: string[]; rows: TableRow[] } = {
      headers: ['Description', 'Prize Item', '', 'Quantity', 'Winners'],
      rows: []
    };

    prizes.forEach(prize => {
      let winnerList: React.ReactNode[] = [];

      const winnerArr = Object.keys(prize.winnerPlayerId || {});
      if (winnerArr.length) {
        winnerArr.forEach(playerID => {
          winnerList.push(
            <>
              <small className='text-sm font-medium leading-none'>
                {' '}
                {`${players[playerID].name} (${players[playerID].playerId})`}
              </small>
              <small className='text-sm font-bold leading-none'>
                {`-${prize.winnerPlayerId[playerID]}`}
              </small>
            </>
          );
          winnerList.push(<span>, </span>);
        });
      }

      let row = {
        id: prize.id,
        mark: prize.quantity <= 0,
        cells: [prize.desc, prize.item, 'x', prize.quantity, winnerList]
      };
      data.rows.push(row);
    });

    return data;
  }, [prizes]);

  return (
    <div>
      <TableView tableData={tableData} />
    </div>
  );
};

export default GamePlayPrize;
