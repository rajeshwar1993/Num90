import { GameState } from '@/constants/enums';
import { BingoBoardCell, GamePlayModel, Prize } from '@/data_models';
import { rdb } from '../../../firebase';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { GAME_PLAY_PATH } from '@/constants/fbConstants';
import { GamePlayKeys } from '@/constants/dbKeys';

const useGamePlayDisplay = (gameID: string, gamePlay: GamePlayModel) => {
  const [gameState, setGameState] = useState<GameState>(gamePlay.gameState);
  const [lastNums, updateLastNums] = useState<Array<BingoBoardCell>>(
    gamePlay.lastFewNumbers
  );
  const [prizes, updatePrizes] = useState<{ [key: string]: Prize }>(
    gamePlay.prizes
  );

  const handleGameStateChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    setGameState(data || 0);
  };
  const handleLastNumChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    updateLastNums(data || {});
  };

  const handlePrizeChanges = (snap: DataSnapshot) => {
    const data = snap.val();
    updatePrizes(data || {});
  };

  useEffect(() => {
    if (gameID && gamePlay && gamePlay.gameConnectId) {
      const gamestateRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.gameState
        }`
      );

      const lastNumsRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.lastFewNumbers
        }`
      );

      const prizerRef = ref(
        rdb,
        `${GAME_PLAY_PATH(gameID, gamePlay.gameConnectId)}/${
          GamePlayKeys.prizes
        }`
      );
      onValue(gamestateRef, handleGameStateChanges);
      onValue(lastNumsRef, handleLastNumChanges);
      onValue(prizerRef, handlePrizeChanges);
    }
  }, [gameID, gamePlay, gamePlay.gameConnectId]);

  return {
    gameState,
    prizes,
    lastNums
  };
};

export default useGamePlayDisplay;
