import { SimpleSelectOption } from '@/components/SimpleSelect';

export enum GameState {
  NOT_STARTED,
  STARTED,
  PAUSED,
  ENDED,
  EVAL
}

export enum AuthModelState {
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT = 'forgot'
}

export enum GameEnv {
  PubOrBar = 'PB',
  CoffeeShop = 'CS',
  HouseParty = 'HP',
  PrivateEvent = 'PE',
  OnlineEvent = 'OE',
  Other = 'Oth'
}

export const GameEnvOpts: SimpleSelectOption[] = [
  {
    display: 'Pub, Bar or Restaurant',
    value: GameEnv.PubOrBar
  },
  {
    display: 'Coffee Shop',
    value: GameEnv.CoffeeShop
  },
  {
    display: 'House Party',
    value: GameEnv.HouseParty
  },
  {
    display: 'Private Function/Event',
    value: GameEnv.PrivateEvent
  },
  {
    display: 'Online Event',
    value: GameEnv.OnlineEvent
  },
  {
    display: 'Other',
    value: GameEnv.Other
  }
];
