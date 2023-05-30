export interface Player {
  uid: string;
  name: string;
  playerId: string;
  gameId: string;
  raiseForEvaluation: boolean;
  requestForTickets: number | null;
  evalDetails: null | {
    ticketID: string;
    prizeID: string;
  };
  ticketCount: number;
  ticketsIDs: { [uid: string]: string };
}

export const DEFAULT_Player: Player = {
  uid: 'NEW_PLAYER',
  name: '',
  playerId: '',
  raiseForEvaluation: false,
  requestForTickets: null,
  evalDetails: null,
  gameId: '',
  ticketCount: 0,
  ticketsIDs: {}
};
