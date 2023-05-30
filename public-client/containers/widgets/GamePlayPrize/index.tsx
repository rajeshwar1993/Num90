import { Player, Prize } from '../../../data_models';
import { FC, useMemo } from 'react';
import { SubHeading, Table, Tooltip } from '../../../components';

interface Props {
  prizes: Prize[];
  players: { [key: string]: Player };
}

const GamePlayPrize: FC<Props> = ({ prizes, players }) => {
  const tableData = useMemo(() => {
    const data = {
      headers: ['Description', 'Prize Item', '', 'Quantity', 'Winners'],
      rows: []
    };

    prizes.forEach(prize => {
      let winnerList: React.ReactNode[] = [];

      const winnerArr = Object.keys(prize.winnerPlayerId || {});
      if (winnerArr.length) {
        winnerArr.forEach(playerID => {
          winnerList.push(
            <Tooltip
              label={`${players[playerID].name} (${players[playerID].playerId})`}
              tooltip={`Ticket ID : ${prize.winnerPlayerId[playerID]}`}
            />
          );
          winnerList.push(<span>{', '}</span>);
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
      <Table tableData={tableData} />
    </div>
  );
};

export default GamePlayPrize;
