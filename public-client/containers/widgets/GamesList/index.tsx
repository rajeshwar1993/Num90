import { GameMetaModel } from '../../../data_models';
import { FC, Fragment } from 'react';
import { Button, GameListGlance, SelectInput } from '../../../components';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  list: GameMetaModel[];
  selectedGame: GameMetaModel | null;
  selectGame: (game: GameMetaModel) => void;
}

const GameList: FC<Props> = ({ list, selectedGame, selectGame }) => {
  if (selectedGame === null) {
    return <></>;
  }

  return (
    <>
      <div className='lg:hidden w-full max-w-sm'>
        <SelectInput
          id='selectgame'
          name='selectgame'
          label='Change game'
          selectText='Select a game'
          defaultValue={{
            display: (
              <>
                <span>{selectedGame.title} </span>
                <span>({selectedGame.gameId})</span>
              </>
            ),
            value: selectedGame.uid,
            completeObject: selectedGame
          }}
          options={list.map(item => ({
            display: (
              <>
                <span>{item.title} </span>
                <span>({item.gameId})</span>
              </>
            ),
            value: item.uid,
            completeObject: item
          }))}
          onChangeValue={game => selectGame(game.completeObject)}
        />
      </div>

      <ScrollArea className='hidden lg:flex flex-col gap-y-6 bg-skin-base lg:pr-6 border-r'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight mb-4'>
          All games
        </h4>
        {list.map(game => (
          <GameListGlance
            key={game.uid}
            gameGlance={game}
            selected={selectedGame.uid === game.uid}
            onClick={()=> selectGame(game)}
          />
        ))}
      </ScrollArea>
    </>
  );
};

export default GameList;
