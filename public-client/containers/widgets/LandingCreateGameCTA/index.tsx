'use client';

import { FC } from 'react';
import { Button } from '../../../components';
import useAuth from '../../../app/AuthProvider';
import { useRouter } from 'next/navigation';
import Routes from '../../../constants/routes';
import { AuthModelState } from '../../../constants/enums';

interface Props {}

const LandingCreateGameCTA: FC<Props> = () => {
  const { user, loading, updateAuthModalVisibility } = useAuth();
  const router = useRouter();

  return (
    <div>
      <Button
        solid={true}
        color='accent'
        size='lg'
        disabled={loading}
        onClick={() => {
          if (user) {
            router.push(Routes.myGames);
          } else {
            updateAuthModalVisibility(AuthModelState.SIGNUP);
          }
        }}
      >
        Create Game Now
      </Button>
    </div>
  );
};

export default LandingCreateGameCTA;
