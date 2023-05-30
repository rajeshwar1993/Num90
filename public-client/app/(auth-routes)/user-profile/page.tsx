'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../AuthProvider';
import Routes from '../../../constants/routes';
import UserProfile from '../../../containers/widgets/UserProfile';

const Page: FC<{ params: { connectorID: string; gameID: string } }> = ({
  params
}) => {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();

  if (userLoading) {
    return <h1>Fetching user...</h1>;
  } else if (userLoading === false && user === null) {
    router.replace(Routes.home);
    return <></>;
  }

  return <UserProfile user={user} />;
};

export default Page;
