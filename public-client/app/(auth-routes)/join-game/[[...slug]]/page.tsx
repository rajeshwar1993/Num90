'use client';

import JoinGame from '../../../../containers/widgets/JoinGame';

export default function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];

  const [gameID, connectorID] = slug;

  return <JoinGame gameId={gameID} connectorId={connectorID} />;
}
