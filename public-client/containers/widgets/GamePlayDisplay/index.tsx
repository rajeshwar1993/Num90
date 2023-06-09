'use client';

import './ball.css';
import { GamePlayModel } from '../../../data_models';
import { FC, useMemo } from 'react';

import clsx from 'clsx';
import useGamePlayDisplay from './useGamePlayDisplay';
import { GameState } from '@/constants/enums';
import { Heading, Para, SubHeading, TableView } from '../../../components';
import QRCode from 'react-qr-code';
import CustImage from '../CustImage';
import logo from '../../../public/images/logo.png';
import { TableRow } from '@/components/Table';

interface Props {
  gameID: string;
  gamePlay: GamePlayModel;
}

const GamePlayDisplay: FC<Props> = ({ gameID, gamePlay }) => {
  const { gameState, prizes, lastNums } = useGamePlayDisplay(gameID, gamePlay);

  const tableData = useMemo(() => {
    const data: { headers: string[]; rows: TableRow[] } = {
      headers: ['Description', 'Prize Item', '', 'Quantity'],
      rows: []
    };

    Object.values(prizes).forEach(prize => {
      let row = {
        id: prize.id,
        mark: prize.quantity <= 0,
        cells: [prize.desc, prize.item, 'x', prize.quantity]
      };
      data.rows.push(row);
    });

    return data;
  }, [prizes]);

  const gameStateText = useMemo(() => {
    switch (gameState) {
      case GameState.NOT_STARTED:
        return (
          <span className='font-semibold text-red-600'>
            Game Has Not Started
          </span>
        );

      case GameState.STARTED:
        return (
          <span className='font-semibold text-green-600'>{`All the best! Let's play.`}</span>
        );

      case GameState.PAUSED:
        return (
          <span className='font-semibold text-red-600'>
            Game has been paused.
          </span>
        );

      case GameState.EVAL:
        return (
          <span className='font-semibold text-red-600'>
            Tickets are being checked.
          </span>
        );

      case GameState.EVAL:
        return (
          <span className='font-semibold text-red-600'>Game has ended.</span>
        );
    }
  }, [gameState]);

  let toRender = null;

  if (gameState === GameState.NOT_STARTED) {
    toRender = (
      <div className='grid grid-cols-2 gap-x-6'>
        <div className='flex flex-col items-center gap-y-4 text-center'>
          <Heading>{gamePlay.gameMeta?.title}</Heading>
          <div className='max-w-xs aspect-square rounded-lg overflow-hidden'>
            <CustImage
              image={{
                src: logo.src,
                alt: 'Logo'
              }}
            />
          </div>
          <span className='text-xl font-semibold max-w-sm'>
            {gamePlay.gameMeta?.tagline}
          </span>
        </div>
        <div className='flex flex-col items-center gap-y-4'>
          <SubHeading>Join Game</SubHeading>
          <div>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/join-game/${gameID}/${gamePlay.gameConnectId}`}
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
              {gamePlay.gameConnectId}
            </SubHeading>
          </div>
        </div>
      </div>
    );
  } else {
    toRender = (
      <div className={clsx('p-4 max-w-7xl mx-auto')}>
        <div>
          <div className='p-2 border-b border-skin-primary flex items-center gap-x-4'>
            <div className='w-9 aspect-square rounded-lg overflow-hidden'>
              <CustImage
                image={{
                  src: gamePlay.gameMeta?.theme.logo?.src || logo.src,
                  alt: 'Logo'
                }}
              />
            </div>
            <span className='text-2xl'>{gamePlay.gameMeta?.title}</span>
          </div>
        </div>

        <div>
          <div className='p-2 border-b border-skin-primary text-center'>
            {gameStateText}
          </div>

          <div className='grid grid-cols-2 gap-x-8 p-4'>
            <div className='text-center'>
              <span className='block font-semibold text-2xl mb-4'>
                Next number is ...
              </span>
              <div className='text-9xl p-4 rounded-full'>
                <section className='stage'>
                  <figure className='ball bubble !bg-skin-accent'>
                    <span
                      style={{
                        display: 'block',
                        marginTop: `calc(50% - 70px)`
                      }}
                    >
                      {lastNums.length ? lastNums[0].num : ''}
                    </span>
                  </figure>
                </section>
              </div>
            </div>
            <div>
              <div>
                <span className='block font-semibold text-2xl mb-2'>
                  Prizes
                </span>
                <TableView tableData={tableData} />
              </div>
              <div className='mt-6 grid grid-cols-2'>
                <div>
                  <span className='block font-semibold text-2xl mb-2'>
                    join game
                  </span>
                  <div className='w-24 aspect-square'>
                    <QRCode
                      size={96}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%'
                      }}
                      value={`${process.env.NEXT_PUBLIC_BASE_URL}/join-game/${gameID}/${gamePlay.gameConnectId}`}
                      viewBox={`0 0 96 96`}
                    />
                  </div>
                </div>
                <div className='mt-4'>
                  <div>
                    <Para>Game ID</Para>
                    <SubHeading styleClasses='text-skin-accent tracking-widest'>
                      {gameID}
                    </SubHeading>
                  </div>

                  <div>
                    <Para>Connector ID</Para>
                    <SubHeading styleClasses='text-skin-accent tracking-widest'>
                      {gamePlay.gameConnectId}
                    </SubHeading>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='gap-y-4'>
      <div className='border-skin-primary min-h-[70vh]'>{toRender}</div>
      <div className='text-center mt-8'>
        <Para>hosted on</Para>
        <SubHeading>num90 games</SubHeading>
      </div>
    </div>
  );
};

export default GamePlayDisplay;
