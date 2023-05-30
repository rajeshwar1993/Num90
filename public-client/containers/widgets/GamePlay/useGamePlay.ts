import {
  BingoBoardCell,
  FunctionResponse,
  GamePlayModel,
  Player,
  Prize,
  Ticket
} from '../../../data_models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Realtime } from '../../../core';
import { GameState } from '../../../constants/enums';
import { genInitialNumSet, getNextRandomNumber } from './utils';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { functions, rdb } from '../../../firebase';
import {
  GAME_PLAY_PATH,
  FF_APPROVE_REJECT_TICKET
} from '../../../constants/fbConstants';
import { GamePlayKeys } from '../../../constants/dbKeys';
import useAuth from '../../../app/AuthProvider';
import { httpsCallable } from 'firebase/functions';

const useGamePlay = (gameID: string, gamePlay: GamePlayModel) => {
  const { user } = useAuth();

  const notCalledNums = useRef(genInitialNumSet());

  const [gameState, setGameState] = useState<GameState>(gamePlay.gameState);
  const [board, updateBoard] = useState<{
    [key: string]: BingoBoardCell;
  }>(gamePlay.board);
  const [lastNums, updateLastNums] = useState<Array<BingoBoardCell>>(
    gamePlay.lastFewNumbers
  );
  const [prizes, updatePrizes] = useState<{ [key: string]: Prize }>(
    gamePlay.prizes
  );
  const [players, updatePlayers] = useState<{ [key: string]: Player }>(
    gamePlay.players
  );
  const [tickets, updateTickets] = useState<{ [key: string]: Ticket }>({});
  // basic functions
  const startGame = () => {
    Realtime.GamePlay.startGame(gameID, gamePlay.gameConnectId);
  };
  const pauseGame = () => {
    Realtime.GamePlay.pauseGame(gameID, gamePlay.gameConnectId);
  };
  const resumeGame = () => {
    Realtime.GamePlay.resumeGame(gameID, gamePlay.gameConnectId);
  };
  const endGame = () => {
    Realtime.GamePlay.resumeGame(gameID, gamePlay.gameConnectId);
  };

  // bingo functions
  const generateNextNumber = () => {
    const len = notCalledNums.current.length;
    const nextIndex = getNextRandomNumber(len);
    const nextNumber = notCalledNums.current[nextIndex];
    // remove it from array
    notCalledNums.current.splice(nextIndex, 1);

    // update the board
    updateBoard(board => {
      board[nextNumber].isCalled = true;
      return board;
    });

    // update last nums
    const updatedLastNums = [...lastNums];
    if (updatedLastNums.length >= 5) updatedLastNums.pop();
    const newCell: BingoBoardCell = { num: nextNumber, isCalled: true };
    updatedLastNums.unshift(newCell);
    updateLastNums(updatedLastNums);

    // update DB
    Realtime.GamePlay.generateNextNumber(
      gameID,
      gamePlay.gameConnectId,
      nextNumber,
      updatedLastNums
    );
  };

  const approveRejectTicketRequest = useCallback(
    async (
      playerUid: string,
      noOfTickets: number,
      action: 'APPROVE' | 'REJECT'
    ) => {
      const func = httpsCallable<unknown, FunctionResponse>(
        functions,
        FF_APPROVE_REJECT_TICKET
      );

      const res = await func({
        gameUID: gamePlay.uid,
        gameId: gameID,
        connectorId: gamePlay.gameConnectId,
        userId: user.uid,
        playerUid,
        noOfTickets,
        action
      });

      if (res.data.error) {
        // throw error
        return;
      }
      return true;
    },
    [gameID, gamePlay.gameConnectId, user?.uid]
  );

  const markEvaluationCorrect = async (
    playerUId: string,
    playerID: string,
    ticketId: string,
    ticketSeqId: string,
    prizeId: string
  ) => {
    await Realtime.GamePlay.markEvaluationCorrect(
      gameID,
      gamePlay.gameConnectId,
      playerUId,
      playerID,
      ticketSeqId,
      prizeId,
      prizes[prizeId] ? prizes[prizeId].quantity : 0
    );

    updateTickets(t => {
      delete t[ticketId];
      return t;
    });
  };

  const rejectTicketEvaluation = async (
    playerUId: string,
    ticketId: string
  ) => {
    await Realtime.GamePlay.markEvaluationInCorrect(
      gameID,
      gamePlay.gameConnectId,
      playerUId
    );

    updateTickets(t => {
      delete t[ticketId];
      return t;
    });
  };

  const fetchTicket = async (ticketId: string) => {
    const data = await Realtime.GamePlay.fetchTicket(
      gameID,
      gamePlay.gameConnectId,
      ticketId
    );

    updateTickets(tickets => ({
      ...tickets,
      [ticketId]: data
    }));
  };

  const evalTicketNum = async (ticketId: string, row: number, col: number) => {
    let updatedTicket = { ...tickets[ticketId] };
    let num = updatedTicket.cells[row][col].num;

    let mark = false;
    if (board[num].isCalled) {
      mark = true;
    }

    updatedTicket.cells[row][col].eval = mark;

    updateTickets({
      ...tickets,
      [ticketId]: updatedTicket
    });
  };

  const handlePlayerChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    updatePlayers(data || {});
  };
  const handlePrizeChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    updatePrizes(data || {});
  };

  const handleGameStateChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    setGameState(data || 0);
  };

  // subscribe to player changes
  useEffect(() => {
    if (gameID && gamePlay && gamePlay.gameConnectId) {
      const playerRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.players
        }`
      );
      const prizerRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.prizes
        }`
      );
      const gamestateRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.gameState
        }`
      );
      onValue(playerRef, handlePlayerChanges);
      onValue(prizerRef, handlePrizeChanges);
      onValue(gamestateRef, handleGameStateChanges);
    }
  }, [gameID, gamePlay.gameConnectId]);

  return {
    gameState,
    board,
    lastNums,
    players,
    tickets,
    prizes,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    generateNextNumber,
    markEvaluationCorrect,
    rejectTicketEvaluation,
    approveRejectTicketRequest,
    fetchTicket,
    evalTicketNum
  };
};

export default useGamePlay;
