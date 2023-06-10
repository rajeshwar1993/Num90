import { Player, Prize, Ticket } from '../../../data_models';
import { FC, ReactNode, useMemo } from 'react';
import { AccordionComp, SubHeading } from '../../../components';
import SingleTicket from '../SingleTicket';

interface Props {
  prizes: { [key: string]: Prize };
  players: { [key: string]: Player };
  tickets: { [key: string]: Ticket };
  markEvalCorrect: (
    playerUId: string,
    playerId: string,
    ticketId: string,
    ticketSeqId: string,
    prizeId: string
  ) => void;
  markEvalInCorrect: (playerId: string, ticketId: string) => void;
  fetchTicket: (ticketId: string) => void;
  evalTicketNum: (ticketId: string, row: number, col: number) => void;
}

const TicketEvaluations: FC<Props> = ({
  prizes,
  players,
  tickets,
  fetchTicket,
  markEvalCorrect,
  markEvalInCorrect,
  evalTicketNum
}) => {
  const playerArr = useMemo(() => {
    return Object.values(players);
  }, [players]);

  const accordianHeader = (
    playerId: string,
    playerName: string,
    prize: Prize | null
  ) => {
    return (
      <div className='flex gap-x-12 items-center py-2'>
        <div className='flex flex-col gap-y-1 items-start border-r pr-6 border-skin-primary'>
          <span className='text-xs font-semibold'>{playerId}</span>
          <span>{playerName}</span>
        </div>
        <span className='font-bold'>{prize ? prize.desc : ''}</span>
      </div>
    );
  };

  const evalData = useMemo(() => {
    const evals: Array<{
      id: string;
      header: ReactNode;
      content: ReactNode;
    }> = [];

    playerArr.forEach(thisPlayer => {
      if (thisPlayer.raiseForEvaluation && thisPlayer.evalDetails !== null) {
        const prize = prizes[thisPlayer.evalDetails.prizeID] || null;
        const ticket = tickets[thisPlayer.evalDetails.ticketID];

        if (!ticket) {
          fetchTicket(thisPlayer.evalDetails.ticketID);
        }

        evals.push({
          id: thisPlayer.uid,
          header: accordianHeader(thisPlayer.playerId, thisPlayer.name, prize),
          content: ticket ? (
            <SingleTicket
              isEvalMode={true}
              ticket={ticket}
              markEvalCorrect={markEvalCorrect.bind(
                null,
                thisPlayer.uid,
                thisPlayer.playerId,
                ticket.uid,
                ticket.seqId,
                prize.id
              )}
              markEvalInCorrect={markEvalInCorrect.bind(
                null,
                thisPlayer.uid,
                ticket.uid
              )}
              markNum={evalTicketNum}
            />
          ) : (
            <span>Fetching ticket</span>
          )
        });
      }
    });

    return <AccordionComp items={evals} />;
  }, [prizes, players, tickets]);

  return (
    <div>
      <div>{evalData}</div>
    </div>
  );
};

export default TicketEvaluations;
