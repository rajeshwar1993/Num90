export interface TicketCell {
  num: number | null;
  isMarked: boolean;
  eval: boolean | null;
}

export interface Cells {
  [key: number]: {
    [key: number]: TicketCell;
  };
}

export interface Ticket {
  uid: string;
  seqId: string;
  gameId: string;
  connectorId: string;
  // num should hold 0 if the value is empty
  cells: Cells;
}
