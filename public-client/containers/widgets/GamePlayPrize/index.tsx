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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant='link' size={'sm'} className='text-xs'>
                    {`${players[playerID].name} (${players[playerID].playerId})`}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`Ticket : ${prize.winnerPlayerId[playerID]}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
          winnerList.push(<span> </span>);
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
      <SubHeading styleClasses='mb-4'>Prizes</SubHeading>
      <TableView tableData={tableData} />
    </div>
  );
};

export default GamePlayPrize;
