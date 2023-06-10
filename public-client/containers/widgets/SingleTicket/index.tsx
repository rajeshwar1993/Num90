import clsx from 'clsx';
import { Prize, Ticket, TicketCell } from '../../../data_models';
import { FC, useCallback, useMemo, useState } from 'react';
import { ButtonWithConfirmation, Form, RadioGroup } from '../../../components';
import { Button } from '@/components/ui/button';

interface Props {
  ticket: Ticket;
  isEvalMode?: boolean;
  prizes?: { [key: string]: Prize };
  markNum?: (ticketId: string, row: number, col: number, mark: boolean) => void;
  raiseForEvaluation?: (ticketId: string, prizeId: string) => void;
  markEvalCorrect?: () => void;
  markEvalInCorrect?: () => void;
}

const SingleTicket: FC<Props> = ({
  ticket,
  isEvalMode = false,
  prizes = {},
  markNum,
  raiseForEvaluation,
  markEvalCorrect = null,
  markEvalInCorrect = null
}) => {
  const [showPrizeOptions, setShowPrizeOptions] = useState<boolean>(false);

  const ticketArr = useMemo(() => {
    let arr: Array<TicketCell[]> = [];

    Object.values(ticket.cells).forEach(row => {
      let arRow: any[] = [];
      Object.values(row).forEach((cell: any) => {
        arRow.push(cell);
      });
      arr.push(arRow);
    });
    return arr;
  }, [ticket]);

  const handleShoutOutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      prizeToShout: { value: string };
    };
    setShowPrizeOptions(false);
    if (raiseForEvaluation)
      raiseForEvaluation(ticket.uid, target.prizeToShout.value);
  };

  const prizesRadioItems = useMemo(() => {
    if (!prizes) return [];

    const items = Object.values(prizes).filter(prize => prize.quantity > 0);

    if (!items) return [];

    return items.map((prize: Prize) => ({
      value: prize.id,
      label: prize.desc,
      disabled: prize.quantity <= 0
    }));
  }, [prizes]);

  const renderTicketCell = useCallback(
    (cell: TicketCell) => {
      let borderStyle = '';

      if (isEvalMode && cell.num && cell.eval !== undefined) {
        borderStyle = 'border-4 ';
        borderStyle +=
          cell.eval === false ? 'border-red-500' : 'border-green-500';
      }

      return (
        <div
          className={clsx(
            'h-full',
            'w-full',
            'flex',
            'justify-center',
            'items-center',
            'rounded-full',
            cell.isMarked && 'text-accent-foreground bg-accent',
            borderStyle
          )}
        >
          {cell.num}
        </div>
      );
    },
    [isEvalMode]
  );

  return (
    <div
      className={clsx('min-w-[300px]', 'w-full', 'max-w-xl', 'p-2', 'mx-auto')}
    >
      <div className='flex justify-between items-center p-2 border border-b-0 border-primary rounded-t-lg'>
        <span>
          Ticked ID: <span className='font-bold'> {ticket.seqId}</span>
        </span>
        {raiseForEvaluation && isEvalMode == false && (
          <Button onClick={() => setShowPrizeOptions(true)}>Shout Out!</Button>
        )}
      </div>
      <div className={clsx('grid', 'grid-rows-3')}>
        {ticketArr.map((row, r) => (
          <div key={r} className={clsx('grid', 'grid-cols-9')}>
            {row.map((cell, c) => (
              <button
                className={clsx(
                  'p-0.5',
                  'border',
                  'border-primary',
                  'aspect-square',
                  'text-sm',
                  'font-semibold',
                  'md:text-base',
                  'lg:text-lg',
                  !(!cell.num || (isEvalMode && !cell.isMarked)) &&
                    'cursor-pointer lg:hover:font-bold'
                )}
                key={cell.num}
                disabled={!cell.num || (isEvalMode && !cell.isMarked)}
                onClick={markNum?.bind(null, ticket.uid, r, c, !cell.isMarked)}
                type='button'
              >
                {renderTicketCell(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>
      {markEvalCorrect && markEvalInCorrect && isEvalMode === true && (
        <div className='flex justify-between mt-4'>
          <Button onClick={markEvalCorrect}>Mark Correct</Button>

          <ButtonWithConfirmation onClick={markEvalInCorrect}>
            Reject
          </ButtonWithConfirmation>
        </div>
      )}
      {showPrizeOptions && isEvalMode === false && (
        <div className='border border-t-0 border-primary rounded-b-lg p-2'>
          <Form submitHandlerFunc={handleShoutOutSubmit}>
            <span>Choose the prize:</span>
            <div className='my-4'>
              <RadioGroup
                id='prizeToShout'
                name='prizeToShout'
                items={prizesRadioItems}
              />
            </div>
            <div className='flex justify-between'>
              <Button type='button' onClick={() => setShowPrizeOptions(false)}>
                cancel
              </Button>
              <Button type='submit'>Submit</Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SingleTicket;
