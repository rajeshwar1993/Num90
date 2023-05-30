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
    <div className='border border-skin-primary rounded-lg p-4'>
      <div className='grid grid-cols-2 lg:grid-cols-5'>
        <SubHeading>Stats</SubHeading>
        <StatDisplay title='Players' value={gameStats.pl} />
        <StatDisplay title='Tickets Dispensed' value={gameStats.td} />
        <StatDisplay title='Tickets Remaining' value={0} />
      </div>
    </div>
  );
};

export default GameStats;
