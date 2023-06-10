import { Player } from '../../../data_models';
import { FC, useMemo, useState } from 'react';
import {
  AccordionComp,
  SubHeading,
  ModalDialog,
  Para
} from '../../../components';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface Props {
  approveRejectTicketRequestLoading: boolean;
  gameID: string;
  connectorId: string;
  players: { [key: string]: Player };
  approveRejectTicketRequest: (
    playerUid: string,
    noOfTickets: number,
    action: 'APPROVE' | 'REJECT'
  ) => void;
}

const PlayerList: FC<Props> = ({
  approveRejectTicketRequestLoading,
  gameID,
  connectorId,
  players,
  approveRejectTicketRequest
}) => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);

  const playerListAccordians = useMemo(() => {
    let filtered = Object.values(players);

    if (searchText) {
      filtered = filtered.filter(
        player =>
          player.playerId.includes(searchText) ||
          player.name.includes(searchText)
      );
    }

    const items = filtered.map(player => ({
      id: player.uid,
      header: (
        <div className='flex flex-col gap-y-1 items-start py-2'>
          <span className='text-xs font-bold'>{player.playerId}</span>
          <span>{player.name}</span>
        </div>
      ),
      content: (
        <>
          {player.requestForTickets && (
            <div className='grid grid-cols-2 gap-x-2 gap-y-2'>
              <Para styleClasses='col-span-2'>
                Request for {player.requestForTickets} tickets:
              </Para>
              <Button
                size={'sm'}
                loading={approveRejectTicketRequestLoading}
                onClick={approveRejectTicketRequest.bind(
                  null,
                  player.uid,
                  player.requestForTickets,
                  'APPROVE'
                )}
              >
                Approve
              </Button>

              <Button
                size={'sm'}
                loading={approveRejectTicketRequestLoading}
                onClick={approveRejectTicketRequest.bind(
                  null,
                  player.uid,
                  player.requestForTickets,
                  'REJECT'
                )}
              >
                Reject
              </Button>
            </div>
          )}
          {player.raiseForEvaluation && (
            <Para>Player has raised ticket for evaluation.</Para>
          )}
        </>
      ),
      pinger: !!(player.requestForTickets || player.raiseForEvaluation)
    }));

    if (items.length === 0) {
      return (
        <blockquote className='mt-6 pl-6 italic'>
          No players have joined the game yet.
        </blockquote>
      );
    }

    return <AccordionComp items={items} />;
  }, [players, searchText, approveRejectTicketRequestLoading]);

  return (
    <>
      <div className='px-2'>
        <div className='mb-2 flex gap-x-3 items-center'>
          <SubHeading>Players</SubHeading>
          <Button onClick={() => setShowJoinModal(true)}>Join Game</Button>
        </div>

        <Input
          id='playerSearch'
          name='playerSearch'
          className='mb-4'
          placeholder='Search with Player name or ID'
          onChange={e => {
            if (e.target.value === '') {
              setSearchText(null);
            } else {
              setSearchText(e.target.value);
            }
          }}
        />
        <ScrollArea className='h-[calc(100vh-250px)] overflow-y-auto shadow-lg p-2 rounded-lg border'>
          {playerListAccordians}
        </ScrollArea>
      </div>
      <ModalDialog
        open={showJoinModal}
        closeModal={() => setShowJoinModal(false)}
      >
        <div className='w-full p-4 max-w-xs grid grid-cols-2 gap-y-3 gap-x-4'>
          <SubHeading styleClasses='col-span-2'>Scan to join</SubHeading>
          <div className='col-span-2'>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/join-game/${gameID}/${connectorId}`}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div>
            <Para>Game ID</Para>
            <SubHeading styleClasses='text-skin-accent tracking-widest'>
              {gameID}
            </SubHeading>
          </div>

          <div>
            <Para>Connector ID</Para>
            <SubHeading styleClasses='text-skin-accent tracking-widest'>
              {connectorId}
            </SubHeading>
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default PlayerList;
