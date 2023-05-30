import { Prize, Ticket } from '../../../data_models';
import { FC, useState } from 'react';
import { Button, SubHeading } from '../../../components';
import SingleTicket from '../SingleTicket';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

const TicketReqComp: FC<{
  ticketsRequested: number | null;
  requestForTickets: (ticketsCount: number) => void;
}> = ({ ticketsRequested, requestForTickets }) => {
  const [numOfTickets, setNumOfTickets] = useState<number>(1);

  return (
    <div>
      {ticketsRequested && (
        <div>
          <SubHeading>
            {' '}
            Requesting {ticketsRequested}{' '}
            {ticketsRequested === 1 ? 'ticket' : 'ticktes'} ...
          </SubHeading>
        </div>
      )}
      {!ticketsRequested && (
        <div className='flex flex-col items-center gap-y-4'>
          <div className='text-center'>
            <div className='flex items-center justify-center gap-x-4'>
              <Button
                color='accent'
                onlyIcon={true}
                onClick={() => setNumOfTickets(t => t - 1)}
              >
                <MinusIcon />
              </Button>
              <span className='font-bold text-4xl'>{numOfTickets}</span>
              <Button
                color='accent'
                onlyIcon={true}
                onClick={() => setNumOfTickets(t => t + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          <Button
            solid={true}
            color='accent'
            size='lg'
            onClick={() => {
              requestForTickets(numOfTickets);
              setNumOfTickets(1);
            }}
          >
            Request for Tickets
          </Button>
        </div>
      )}
    </div>
  );
};

interface Props {
  requestForTickets: (ticketsCount: number) => void;
  ticketsRequested: number | null;
  tickets: { [uid: string]: Ticket };
  prizes: { [key: string]: Prize };
  markTicketNum: (
    ticketId: string,
    row: number,
    col: number,
    mark: boolean
  ) => Promise<void>;
  raiseForEvaluation: (ticketId: string, prizeId: string) => Promise<void>;
}

const PlayArea: FC<Props> = ({
  requestForTickets,
  ticketsRequested,
  tickets,
  prizes,
  markTicketNum,
  raiseForEvaluation
}) => {
  return (
    <div className='min-w-full h-full flex flex-col'>
      <div className='flex-1 border-b border-skin-primary pb-4 mb-4 grid grid-cols-1 md:grid-cols-2'>
        {Object.values(tickets).map(ticket => (
          <SingleTicket
            ticket={ticket}
            prizes={prizes}
            markNum={markTicketNum}
            raiseForEvaluation={raiseForEvaluation}
          />
        ))}
      </div>
      <TicketReqComp
        ticketsRequested={ticketsRequested}
        requestForTickets={requestForTickets}
      />
    </div>
  );
};

export default PlayArea;
