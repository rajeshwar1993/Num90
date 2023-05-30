import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { PLAYER_GAME_PATH } from '../../../constants/fbConstants';
import {
  Button,
  Form,
  LoadingIcon,
  SubHeading,
  TextInput
} from '../../../components';

interface Props {
  gameID: string | undefined;
  connectorID: string | undefined;
}

const PlayerGameConnectorForm: FC<Props> = ({ gameID, connectorID }) => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      gameID: { value: string };
      connectorID: { value: string };
    };

    const gameID = target.gameID.value; // typechecks!
    const connectorID = target.connectorID.value; // typechecks!

    router.replace(PLAYER_GAME_PATH(gameID, connectorID));
  };

  if (gameID && connectorID) {
    router.replace(PLAYER_GAME_PATH(gameID, connectorID));

    return (
      <div>
        Connecting to the game... <LoadingIcon />
      </div>
    );
  }

  return (
    <div>
      <Form submitHandlerFunc={handleFormSubmit}>
        <div className='flex flex-col items-center gap-y-4'>
          <SubHeading>Connect to game</SubHeading>
          <TextInput
            required
            label='Game ID'
            type={'text'}
            placeholder={'GAME ID'}
            name={'gameID'}
            id={'gameID'}
            defaultValue={gameID}
            disabled={!!gameID}
            styleClasses='text-center tracking-widest !font-bold text-skin-accent'
          />
          <TextInput
            required
            label='Connector ID'
            type={'text'}
            placeholder={'CONNECTOR ID'}
            name={'connectorID'}
            id={'connectorID'}
            defaultValue={connectorID}
            styleClasses='text-center tracking-widest !font-bold text-skin-accent'
          />
          <Button
            solid={true}
            color='accent'
            type='submit'
            styleClasses='w-full'
            size='lg'
          >
            GO
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PlayerGameConnectorForm;
