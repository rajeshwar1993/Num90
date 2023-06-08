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
  PubOrBar = 'Pub, Bar or Restaurant',
  CoffeeShop = 'Coffee Shop',
  HouseParty = 'House Party',
  PrivateEvent = 'Private Function/Event',
  OnlineEvent = 'Online Event',
  Other = 'Other'
}
