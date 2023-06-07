import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { PLAYER_GAME_PATH } from '../../../constants/fbConstants';
import { Form, LoadingIcon } from '../../../components';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
        <CardHeader className='space-y-1 pl-0'>
          <CardTitle className='text-2xl'>Connect to game</CardTitle>
        </CardHeader>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='gameID'>Game ID</Label>
            <Input
              required
              type={'text'}
              placeholder={'GAME ID'}
              name={'gameID'}
              id={'gameID'}
              defaultValue={gameID}
              disabled={!!gameID}
              className='text-center tracking-widest font-bold text-accent'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='gameID'>Connector ID</Label>
            <Input
              required
              type={'text'}
              placeholder={'CONNECTOR ID'}
              name={'connectorID'}
              id={'connectorID'}
              defaultValue={connectorID}
              className='text-center tracking-widest font-bold text-accent'
            />
          </div>

          <Button type='submit' className='w-full'>
            GO
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PlayerGameConnectorForm;
