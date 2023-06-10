import { Player } from '../../../data_models';
import { FC, useMemo, useState } from 'react';
import {
  AccordionComp,
  TextInput,
  SubHeading,
  ModalDialog,
  Para
} from '../../../components';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';

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
          <span className='text-xs font-semibold'>{player.playerId}</span>
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

    return <AccordionComp items={items} />;
  }, [players, searchText]);

  return (
    <>
      <div>
        <div className='mb-2 flex gap-x-3 items-center'>
          <SubHeading>Players</SubHeading>
          <Button
            color='accent'
            solid={true}
            onClick={() => setShowJoinModal(true)}
          >
            Join Game
          </Button>
        </div>
        <TextInput
          id='playerSearch'
          name='playerSearch'
          styleClasses='mb-4'
          label='Search'
          placeholder='Player name or ID'
          onChange={e => {
            if (e.target.value === '') {
              setSearchText(null);
            } else {
              setSearchText(e.target.value);
            }
          }}
        />
        {playerListAccordians}
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
