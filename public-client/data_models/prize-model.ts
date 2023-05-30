export interface Prize {
  id: string;
  desc: string;
  item: string;
  quantity: number;
  winnerPlayerId: { [playerId: string]: string };
}

export const DEFAULT_Prizes: Prize[] = [
  {
    id: 'P_001',
    desc: 'Jaldi Five',
    item: 'Rs 100',
    quantity: 1,
    winnerPlayerId: {}
  },
  {
    id: 'P_002',
    desc: 'Top Row',
    item: 'Rs 200',
    quantity: 1,
    winnerPlayerId: {}
  },
  {
    id: 'P_003',
    desc: 'Middle Row',
    item: 'Rs 200',
    quantity: 1,
    winnerPlayerId: {}
  },
  {
    id: 'P_004',
    desc: 'Bottom Row',
    item: 'Rs 200',
    quantity: 1,
    winnerPlayerId: {}
  },
  {
    id: 'P_005',
    desc: 'Full House',
    item: 'Rs 500',
    quantity: 2,
    winnerPlayerId: {}
  }
];
