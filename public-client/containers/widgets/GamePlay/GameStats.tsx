import { Player } from '../../../data_models';
import { FC, useMemo } from 'react';
import { StatDisplay, SubHeading } from '../../../components';

interface Props {
  players: { [key: string]: Player };
}

const GameStats: FC<Props> = ({ players }) => {
  const gameStats = useMemo(() => {
    const data = {
      pl: 0,
      td: 0,
      tr: 0
    };

    const plArr = Object.values(players || {});

    let ticketCount = 0;
    plArr.forEach(pl => {
      const noOfTicks = Object.keys(pl.ticketsIDs || {}).length;
      ticketCount += noOfTicks;
    });

    data.pl = plArr.length;
    data.td = ticketCount;

    return data;
  }, [players]);

  return (
    <div className=''>
      <div className='grid grid-cols-3'>
        <StatDisplay title='Players' value={gameStats.pl} />
        <StatDisplay title='Tickets' value={gameStats.td} />
        <StatDisplay title='Remaining' value={0} />
      </div>
    </div>
  );
};

export default GameStats;
