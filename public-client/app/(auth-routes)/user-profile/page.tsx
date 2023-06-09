'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../AuthProvider';
import Routes from '../../../constants/routes';
import UserProfile from '../../../containers/widgets/UserProfile';

export default function Page({
  params
}: {
  params: { connectorID: string; gameID: string };
}) {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();

  if (userLoading) {
    return <h1>Fetching user...</h1>;
  } else if (userLoading === false && user === null) {
    router.replace(Routes.home);
    return <></>;
  } else if (user !== null) {
    return <UserProfile user={user} />;
  }
}
