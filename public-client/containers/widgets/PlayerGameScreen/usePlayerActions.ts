import {
  FunctionResponse,
  GameMetaGlanceModel,
  Player,
  Prize,
  Ticket,
  UserModel
} from '../../../data_models';
import { useCallback, useEffect, useState } from 'react';
import { Realtime } from '../../../core';
import { httpsCallable } from 'firebase/functions';
import { functions, rdb } from '../../../firebase';
import { GameState } from '../../../constants/enums';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import {
  GAME_PLAY_PATH,
  FF_JOIN_GAME_OR_FETCH_EXISTING
} from '../../../constants/fbConstants';
import { GamePlayKeys } from '../../../constants/dbKeys';

const usePlayerActions = (
  gameID: string,
  connectorID: string,
  user: UserModel
) => {
  const [loading, setLoading] = useState<{ joinGame: boolean }>({
    joinGame: false
  });
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED);
  const [gameJoinStatus, setGameJoinStatus] = useState<
    'NOT_FOUND' | 'FOUND' | 'SEARCHING' | 'JOINED'
  >('SEARCHING');
  const [gameDetails, setGameDetails] = useState<GameMetaGlanceModel | null>(
    null
  );
  const [player, setPlayer] = useState<Player | null>(null);
  const [prizes, setPrizes] = useState<{ [key: string]: Prize }>({});
  const [tickets, setTickets] = useState<{ [uid: string]: Ticket }>({});

  const updateLoading = (key: 'joinGame', value: boolean) => {
    setLoading(l => ({
      ...l,
      [key]: value
    }));
  };

  const checkIfGameExists = useCallback(
    async (gameID: string, connectorID: string) => {
      const res: false | GameMetaGlanceModel =
        await Realtime.GamePlay.checkGameExists(gameID, connectorID);
      if (res) {
        setGameDetails(res);
        setGameJoinStatus('FOUND');
      } else {
        setGameJoinStatus('NOT_FOUND');
      }
    },
    [gameID, connectorID]
  );

  const joinOrFetchGamePlayer = async () => {
    updateLoading('joinGame', true);
    const func = httpsCallable<unknown, FunctionResponse>(
      functions,
      FF_JOIN_GAME_OR_FETCH_EXISTING
    );

    const res = await func({
      gameId: gameID,
      connectorId: connectorID,
      userId: user.uid,
      userName: user.name
    });

    if (res.data.error) {
      // TODO - handle error
      updateLoading('joinGame', false);

      return;
    }

    const player: Player = res.data.value;
    setPlayer(player);
    setGameJoinStatus('JOINED');
    updateLoading('joinGame', false);
  };

  const handleGameStateChange = (snap: DataSnapshot) => {
    const data = snap.val();
    setGameState(data);
  };
  const handleGamePrizeChange = (snap: DataSnapshot) => {
    const data = snap.val();
    setPrizes(data);
  };

  const handlePlayerChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    setPlayer(data);
  };

  const handleTicketChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    setTickets(tiks => ({
      ...tiks,
      [data.uid]: data
    }));
  };

  const requestForTickets = async (noOfTickets: number) => {
    if (player === null) {
      // TODO - handle error
      return;
    }

    await Realtime.GamePlay.requestForTickets(
      gameID,
      connectorID,
      player.uid,
      noOfTickets
    );
  };

  const markTicketNum = async (
    ticketId: string,
    row: number,
    col: number,
    mark: boolean
  ) => {
    await Realtime.GamePlay.markTicketNum(
      gameID,
      connectorID,
      ticketId,
      row,
      col,
      mark
    );
  };

  const raiseForEvaluation = async (ticketId: string, prizeId: string) => {
    if (player === null) {
      // TODO - handle error
      return;
    }
    await Realtime.GamePlay.raiseForEvaluation(
      gameID,
      connectorID,
      player.uid,
      ticketId,
      prizeId
    );
  };

  useEffect(() => {
    checkIfGameExists(gameID, connectorID);
  }, [gameID, connectorID]);

  useEffect(() => {
    // listen to game sttus and prize changes
    if (gameJoinStatus === 'JOINED') {
      const gameStateRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, connectorID)}/${GamePlayKeys.gameState}`
      );

      const gamePrizeRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, connectorID)}/${GamePlayKeys.prizes}`
      );

      onValue(gameStateRef, handleGameStateChange);
      onValue(gamePrizeRef, handleGamePrizeChange);
    }
  }, [gameJoinStatus]);

  // listen to player changes
  useEffect(() => {
    if (player && player.uid) {
      const playerRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, connectorID)}/${GamePlayKeys.players}/${
          player.uid
        }`
      );
      onValue(playerRef, handlePlayerChanges);
    }
  }, [player?.uid]);

  // listen to ticket changes
  useEffect(() => {
    if (player?.uid && player.ticketsIDs) {
      let keys = Object.keys(player.ticketsIDs);
      keys = keys.filter(key => tickets[key] === undefined);
      keys.forEach(ticketKey => {
        const ticketRef = ref(
          rdb,
          `${GAME_PLAY_PATH(gameID, connectorID)}/${
            GamePlayKeys.tickets
          }/${ticketKey}`
        );
        onValue(ticketRef, handleTicketChanges);
      });
    }
  }, [player?.uid, player?.ticketsIDs]);

  return {
    loading,
    gameState,
    gameJoinStatus,
    gameDetails,
    player,
    prizes,
    tickets,
    joinOrFetchGamePlayer,
    requestForTickets,
    markTicketNum,
    raiseForEvaluation
  };
};

export default usePlayerActions;
